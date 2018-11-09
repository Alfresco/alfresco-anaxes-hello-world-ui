# Welcome
This project contains a sample ADF based UI that uses the [alfresco-anaxes-hello-world-service](https://github.com/Alfresco/alfresco-anaxes-hello-world-service).
# Build
To build the UI execute the following command
`npm install`
 # Run
To run the UI you should first have the alfresco-anaxes-hello-world-service [running](https://github.com/Alfresco/alfresco-anaxes-hello-world-service/#run).
Then configure the UI to be able to connect to the hello world service by changing `backendHost` in `app.config.json` to the URL where your hello world service is running.
To start the UI application execute
`npm start`
## SSO demonstration
To demonstrate the Single Sign On capability of the Hello World App you need to configure in `app.config.json` the URL to Alfresco Content Services(`ecmHost`), Alfresco Process Services(`bpmHost`) and Alfresco Identity Service(`host` under the `oauth2` settings).