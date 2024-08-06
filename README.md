# interns-project

This repo contains two demo applications for use when deploying resources on eg
AWS.

## webserver / api

This is a simple HTTP server which accepts requests on `GET /` and responds
with a simple message. Depending on whether the database connection is set up
properly, the webserver will keep track of how many times the webpage
(see below) has been refreshed.

## webpage / webapp

This is a simple web page which tries to reach out to the webserver and render
the response message.

For more details about these two applications, refer to the README files in the
corresponding directories.

## Get started

1. Pull this repository
2. Ensure you have Docker, Nodejs 20 + yarn installed
3. Ensure you have MongoDB installed and running
   (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
4. Do `yarn install`
5. Once all dependencies have installed, do `yarn start` to start the actual
   applications
6. Visit http://localhost:8080, verify you see `Hello there friend, this is your 1 visit`
