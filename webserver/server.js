const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const winston = require("winston");

async function main() {
  // Set up logging
  const logDir = process.env.WHEREBY_INTERNS_LOG_DIR;
  const logger = new winston.createLogger({
    transports: [
      new winston.transports.Console({
        colorize: "all",
      }),
      logDir
        ? new winston.transports.File({
            filename: path.join(logDir, "webserver.log"),
          })
        : null,
    ].filter(Boolean),
  });

  if (!logDir) {
    logger.warn(
      `WHEREBY_INTERNS_LOG_DIR not set, logging to console only.
       This is ok for local development, but not recommended for production.`
    );
  }

  // Set up database connection
  let dbUrl = process.env.WHEREBY_INTERNS_DB_URL;

  if (!dbUrl) {
    dbUrl = "mongodb://localhost:27017";
    logger.warn(`WHEREBY_INTERNS_DB_URL not set, using default value ${dbUrl}`);
  }

  const dbClient = new MongoClient(dbUrl);
  let db;

  try {
    logger.info("Connecting to db...");
    await dbClient.connect();
    db = dbClient.db("whereby-interns");
    logger.info("Connected successfully to db");
  } catch (error) {
    logger.error(`Failed to connect to db: ${error}`);
  }

  // Set up http server
  const server = express();
  const port = parseInt(process.env.WHEREBY_INTERNS_PORT || "3000");

  server.get("/", async (req, res) => {
    logger.info("GET /");

    if (!req.query.sessionId) {
      res.json({ message: "Hello there stranger!" });
    } else if (db) {
      const sessions = db.collection("sessions");
      await sessions.updateOne(
        {
          _id: req.query.sessionId,
        },
        { $set: { lastVisit: new Date() }, $inc: { nVisits: 1 } },
        { upsert: true }
      );

      const doc = await sessions.findOne({ _id: req.query.sessionId });

      res.json({
        message: `Hello there friend, this is your ${doc.nVisits} visit`,
      });
    }
  });

  server.listen(port, () => {
    logger.info(`Http server listening on port ${port}`);
  });
}

main();
