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
            apiGatewayGetProjectUsersUrl: apiGatewayBaseUrl + '/gateway/gateway/getProjectUsers',
            apiGatewayGetProjectRolesUrl: apiGatewayBaseUrl + '/gateway/gateway/getProjectRoles',           
            apiGatewayGetProjectGroupsUrl: apiGatewayBaseUrl + '/gateway/gateway/getProjectGroups',
            apiGatewayCreateInvitationUrl: apiGatewayBaseUrl + '/gateway/gateway/createInvitation',              
            apiGatewayGetPendingInvitationsUrl: apiGatewayBaseUrl + '/gateway/gateway/getPendingInvitations',            
            apiGatewayCreateProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/createProject',  
            apiGatewayGetReceivedInvitationsUrl: apiGatewayBaseUrl + '/gateway/gateway/getReceivedInvitations', 
            apiGatewayAcceptInvitationUrl: apiGatewayBaseUrl + '/gateway/gateway/acceptInvitation',
            apiGatewayDeclineInvitationUrl: apiGatewayBaseUrl + '/gateway/gateway/declineInvitation', 
            apiGatewayRemoveUserFromProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/removeUserFromProject',  
            apiGatewayUpdateUserRolesForProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/updateUserRolesForProject',  
            apiGatewayUpdateUserGroupsForProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/updateUserGroupsForProject',
            apiGatewayUpdateUserRolesAndGroupsForProjectUrl: apiGatewayBaseUrl + '/gateway/gateway/updateUserRolesAndGroupsForProject',                                              
            apiGatewayLogoutUrl: apiGatewayBaseUrl + "/gateway/logout",
            changeAvatarUrl: apiGatewayBaseUrl + '/gateway/gateway/changeAvatar',
            changePasswordUrl: apiGatewayBaseUrl + '/gateway/gateway/changePassword',
            
            apiEntryGetEntryTypesForProjectUrl: apiGatewayBaseUrl + '/gateway/entry/getEntryTypesForProject',
            apiEntryGetEntryStatusesUrl: apiGatewayBaseUrl + '/gateway/entry/getEntryStatuses',
            apiEntryCreateEntryUrl: apiGatewayBaseUrl + '/gateway/entry/createEntry',
            apiEntryUpdateEntryUrl: apiGatewayBaseUrl + '/gateway/entry/updateEntry',
            apiEntryCreateDeficiencyDetailsUrl: apiGatewayBaseUrl + '/gateway/entry/createDeficiencyDetails',
            apiEntryUpdateDeficiencyDetailsUrl: apiGatewayBaseUrl + '/gateway/entry/updateDeficiencyDetails',
            apiEntryGetEntriesUrl: apiGatewayBaseUrl + '/gateway/entry/getEntries',            
            
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