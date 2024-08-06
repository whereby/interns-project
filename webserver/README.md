# webserver

This is a demo web server which is used to demonstrate how we can deploy our
Nodejs applications using different AWS services

## Environment variables

`WHEREBY_INTERNS_LOG_DIR` - The directory where the log files should be written.
If not set, the app will only log to the console. When set, the app will create
a a file at `<WHEREBY_INTERNS_LOG_DIR>/webserver.log`.

`WHEREBY_INTERNS_PORT` - The TCP port which the server should listen for HTTP
requests. If not set, port 3000 will be used as default.

`WHEREBY_INTERNS_DB_URL` - The db url to use when connecting to the database.
When not set, mongodb://localhost:27017 will be used.

When hosted on AWS, this may be the url to connect to a AWS DocumentDB, which is
compatible with Mongo. When setting this in a production environment, refer to
https://www.mongodb.com/docs/manual/reference/connection-string/ for how to
include username and password
