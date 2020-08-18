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
[App architecture](https://imgur.com/TRa6EfC)


### Challenges faced 
As a developer who has never worked with server side javascript (Nodejs) and NoSql database (MongoDB), this was a bit of a challenge but mainly due to learning and implementing at the same time. This was my first time building an app with NodeJS/MongoDB. Being a Java developer developer most of my career, I am very impressed by the NodeJs/Express/Mongo stack and how fast the development feels. I loved learning and working with MongoDB, it feels like a big Python dictionary but more powerful.
 
### Final thoughts and improvements
Here are some key improvements I unfortunately could not make due to technical issues and time constraints:
* Creating a Docker image. Since I was developing on a Windows 10 Home edition, installation and configuration of Docker was a bit time consuming and tedius. 
* User authentication via JWT
* Caching (to address future performance/scaling issues)
* Set up .env file for environment variables for different environments (i.e production, development)
* Unit testing of Controller functions via Mocking libraries
* Custom error class


