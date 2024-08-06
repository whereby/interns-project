# webserver

This is a demo web server which is used to demonstrate how we can deploy our
Nodejs applications using different AWS services

## Get started

1. Pull this repository
2. Ensure you have Nodejs 20 + yarn installed
3. In this directory, do `yarn install`
4. Once all dependencies have installed, do `yarn start` to start the actual
   server
5. Visit http://localhost:3000, verify you see `Hello World!`

## Environment variables

`WHEREBY_INTERNS_LOG_DIR` - The directory where the log files should be written.
If not set, the app will only log to the console. When set, the app will create
a a file at `<WHEREBY_INTERNS_LOG_DIR>/webserver.log`.

`WHEREBY_INTERNS_PORT` - The TCP port which the server should listen for HTTP
requests. If not set, port 3000 will be used as default.

`WHEREBY_INTERNS_DB_URL` - The db url to use when connecting to the database.
When hosted on AWS, this may be the url to connect to a AWS DocumentDB, which is
compatible with Mongo.
