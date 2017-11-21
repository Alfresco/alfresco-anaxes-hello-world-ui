# Welcome

This project contains a sample ADF based UI that uses the [alfresco-anaxes-hello-world-service](https://github.com/Alfresco/alfresco-anaxes-hello-world-service).

# Build

To build the UI execute the following command

`npm install`

# Run

To run the UI you should first have the alfresco-anaxes-hello-world-service [running](https://github.com/Alfresco/alfresco-anaxes-hello-world-service/#run).

Then configure the UI to be able to connect to the hello world service by changing `HELLO_BACKEND_HOST` and `HELLO_BACKEND_HOST` in `src/assets/app.config.json` to the host and port where your hello world service is running.

To start the UI application execute

`npm start`