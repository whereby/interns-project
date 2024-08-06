# webpage

This directory contains a sample webpage which can be hosted on AWS or any other
service. Its implementation is really basic, just printing out a simple
"Hello world" message.

## building

Before deploying this page to production, it needs to be built using `yarn build`
This command compiles the source code and places the resulting files in the
`dist` dir. When building for production, make sure you have set the
`WHEREBY_INTERNS_WEBSERVER_URL` environment variable to point to the url of your
webserver.
