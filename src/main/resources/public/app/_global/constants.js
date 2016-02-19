'use strict';

var contextParams = require('./context-params');

var AppSettings = function(config) {
    var apiGatewayBaseUrl = 'http://' + config.gatewayHost + ":" + config.gatewayPort;

    return {
        appTitle: 'conspector',
        appLanguage: 'en',
        s3AccessInfo: {
            s3UploadUrl: config.s3UploadUrl,
            s3AccessKeyId: config.s3AccessKeyId, 
            s3Policy: config.s3Policy, 
            s3Signature: config.s3Signature
        },
        /*        isNotMobile: isNotMobile,*/
        contextPrefix: contextParams.contextPrefix(), //'/gateway',        
        apiUrl: {
            authUrl: apiGatewayBaseUrl + '/gateway',
            apiGatewayGetUserProfileUrl: apiGatewayBaseUrl + '/gateway/gateway/getUserProfile',
            apiGatewayGetProjectUrl:  apiGatewayBaseUrl + '/gateway/gateway/getProject',
            apiGatewayUpdateProjectUrl:  apiGatewayBaseUrl + '/gateway/gateway/updateProject',
            apiGatewayGetProjectsUrl: apiGatewayBaseUrl + '/gateway/gateway/getUserProjects',
            apiGatewayCreateProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/createProject',          
            apiGatewayLogoutUrl: apiGatewayBaseUrl + "/gateway/logout",
            changeAvatarUrl: apiGatewayBaseUrl + '/gateway/gateway/changeAvatar',
            
            tasksManagementGetTasksUrl: apiGatewayBaseUrl + '/gateway/tasksManagement/getTasks',
            tasksManagementExportTasksToCSVUrl: apiGatewayBaseUrl + '/gateway/tasksManagement/exportTasksToCsv',
            tasksManagementCreateTaskUrl: apiGatewayBaseUrl + '/gateway/tasksManagement/createTask',
            tasksManagementChangeTaskUrl: apiGatewayBaseUrl + '/gateway/tasksManagement/changeTask',
            tasksManagementDeleteTaskUrl: apiGatewayBaseUrl + '/gateway/tasksManagement/deleteTask',
            filesManagementGeneratePresignedUrlForS3: apiGatewayBaseUrl + '/gateway/filesManagement/generatePresignedUrlForS3'
            
        },
    };
};

module.exports = AppSettings;