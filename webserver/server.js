const express = require("express");
const path = require("path");
const winston = require("winston");

const server = express();
const logDir = process.env.WHEREBY_INTERNS_LOG_DIR;
const port = parseInt(process.env.WHEREBY_INTERNS_PORT || "3000");

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

server.get("/", (req, res) => {
  logger.info("GET /");

  res.send("Hello World!");
});

server.listen(port, () => {
  logger.info(`Example server listening on port ${port}`);
});
