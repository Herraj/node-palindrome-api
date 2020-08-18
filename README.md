# Palindrome Messages REST APi
### A very simple public Restful API to manage palindrome strings. This is a Nodejs application using MongoDB Atlas clusters

#### API Specification
https://documenter.getpostman.com/view/2921837/T1LPCmEU

#### Hosted on Heroku
https://node-palindrome-restapi.herokuapp.com/messages 

##### Post-man app is recommended to access this api


# Development environment set up
#### Clone this repo: https://github.com/Herraj/node-palindrome-api.git
##### You will need Nodejs installed. Docker image unavailable since I was running into installation issues with Windows 10 Home version
##### For MongoDB you don't need to setup a local install, it is connected to the MongoDB Atlas Cluster 
1. Run `npm install` to install all dependencies
2. Run `npm start` to start the server. By default this app will be listening on localhost:3000/messages/
3. To run tests `npm test` 

### API Flow Diagram
![API Flow Diagram](https://i.imgur.com/p1vdhwO.png)
