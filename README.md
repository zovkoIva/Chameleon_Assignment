# Chameleon_Assignment
Chameleon assignment is a simple Angular single page app with a REST backend, based on Node and Express.
Here are the libraries used for the client and the server:
•	Angular - the framework used to build the client application
•	Angular Material - an angular plugin that provides out-of-the-box Material Design
•	Node - the actual server running the JavaScript code
•	Express - a routing library for responding to server requests and building REST APIs
•	TypeORM - a database ORM library for TypeScript
Additional packages:
•	@angular/material and @angular/cdk - libraries provide components based on Google’s Material Design
•	@angular/animations - is used to provide smooth transitions
•	@angular/flex-layout -gives the tools to make design responsive.

Node Rest API
Implementation of the server is based on Node and Express.
Used libraries:
•	Typescript and tsc – for developing in TypeScript
•	TypeORM - library that injects behavior into TypeScript classes and turns them into database models

Files:
item.ts -  contain the logic for all the routes for operations on item object which are created and saved into or deleted from the database.
To start server navigate to Server/dist folder and type:
1.	npm install --save-exact express@4.16.4 @types/express@4.16.0  express-bearer-token@2.2.0 tsc@1.20150623.0 typescript@3.1.3 typeorm@0.2.8 sqlite3@4.0.3 cors@2.8.4 @types/cors@2.8.4
2.	npx tsc
3.	node server.js


To start application navigate to Frontend/src/app and type:
1.	npm i @angular/material@7.0.2 @angular/cdk@7.0.2 @angular/animations@7.0.1 @angular/flex-layout@7.0.0-beta.19
2.	ng serve

