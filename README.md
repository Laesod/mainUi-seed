# mainUi-seed
Main UI application

The goal of this project is to have a private portion of the "common" spring based web application. It is based on gulp-browserify boilerplate for angularjs (read here for more details: https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate).

Prerequisites:
	- You have gateway application up and running, user should be authenticated;


In order to start the application execute in cmd in the root path:

	- npm i; (will install npm packages dependencies)
	- bower i; (will install js dependencies)
	- gulp dev; (will produce build folder with final app that should be ready for production use)
	- mvn clean install
	- mvn spring-boot:run

