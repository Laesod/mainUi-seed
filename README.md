# mainUi-seed
Main UI application

The goal of this project is to have a private portion of the "common" spring based web application. UI portion of it is based on gulp-browserify boilerplate for angularjs (read here for more details: https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate).

In order to start the application execute in cmd in the root path:

	- npm i; (will install npm packages dependencies)
	- bower i; (will install js dependencies)
	- gulp prod; (will produce build folder with final app that should be ready for production use)
	- mvn clean install
	- mvn spring-boot:run
	
Application should be available now at localhost:63769/mainUi. Note that for spring application URL context path /mainUi is specified (needed for deployment on production environment and being served by proxy based on url paths). If user is not loged in in gateway application he will be redirected to login view of it (if it is up and running).

To speed up UI development next approach is supported:

After starting spring application in command line navigate to root folder folder and execute "gulp dev" (will prepare UI that is ready to be served by web server without URL context path). In another terminal navigate to {root folder}/src/main/public and 
start npm live-server on port 1001 by executing "live-server --port=1001" (can be any other web server but used port should be 1001 or 1000 though). UI application 
should be available now at localhost:1001 and can be updated in "live" mode. Served this way UI application should be able to access services from spring application.

	

	

