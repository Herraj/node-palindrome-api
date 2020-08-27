# Palindrome Messages REST APi
### A very simple public Restful API to manage palindrome strings. This is a Nodejs application using MongoDB Atlas clusters for data storage

#### API Specification
https://documenter.getpostman.com/view/2921837/T1LPCmEU

#### Hosted on Heroku
https://node-palindrome-restapi.herokuapp.com/messages 

##### Post-man app is recommended to access this api


# Development environment set up
#### Clone repo: https://github.com/Herraj/node-palindrome-api.git
##### You will need Nodejs installed. Docker image unavailable since I was running into installation issues with Windows 10 Home version
##### For MongoDB you don't need to setup a local install, it is connected to the MongoDB Atlas Cluster 
1. Run `npm install` to install all dependencies
2. Run `npm start` to start the server. By default this app will be listening on localhost:3000/messages/
3. Run `npm test` to run component and unit tests

### Dependencies and packages used
* NodeJS (Express, body-parser, morgan)
* MongoDB (Mongoose)
* Testing & validation (joi, mocha, chai)

### App architecture overview 
[App architecture](https://drive.google.com/file/d/1qGOM8h0kuv2IH-Ev90sSUxDChIDHT6XR/view?usp=sharing)
 
### Improvements & bug fixes(currently being worked on)
* Fix PATCH request not updating isPalindrome boolean
* Fix pagination to show 'next page' link
* Sanitize for string numbers
* Sanitzie query params
* Creating a Docker image. Since I was developing on a Windows 10 Home edition, installation and configuration of Docker was a bit time consuming and tedius. 
* User authentication via JWT
* Set up .env file for environment variables for different environments (i.e production, development)
* Unit testing of Controller functions via Mocking libraries
* Custom error class
* Flaky end point tests


