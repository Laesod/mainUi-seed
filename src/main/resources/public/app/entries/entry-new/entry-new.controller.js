'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryNewCtrl($rootScope, $scope, $state, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService, projectsService) {
    $scope.groupSearchText = "";
    $scope.selectedProjectGroups = [];
    $scope.minDueDate = new Date();
    $scope.photoUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";

     $scope.entry = {
         entryTypeGuid: $rootScope.entriesFilter.entryTypeGuid,
         groups: [],
         deficiencyDetails: {},
         contactDetails: {}
     };
    
    $scope.getEntryTypes = function () {
        entriesService.getEntryTypesForProject({ projectGuid: $rootScope.currentProjectGuid }).then(function (entryTypesForProject) {
            $scope.entryTypes = entryTypesForProject;
        });
    }
    
    projectsService.getProjectGroups({ projectGuid: $rootScope.currentProjectGuid}).then(function (projectGroups) {
        $scope.projectGroups = projectGroups;
    });
    
    $scope.searchProjectGroup = function(groupSearchText){
        return _.filter($scope.projectGroups, function(group){
            return group.groupName.indexOf(groupSearchText) > -1;
        })
    }    
    
    $scope.getDeficiencyStatuses = function(){
        entriesService.getEntryStatuses({entryType: "Deficiency"}).then(function(deficiencyStatuses){
            $scope.deficiencyStatuses = deficiencyStatuses;
            $scope.entry.deficiencyDetails.entryStatusGuid = deficiencyStatuses[0].entryStatusGuid;
        });
    }
    
    $scope.getContactTypes = function(){
        entriesService.getContactTypes().then(function(contactTypes){
            $scope.contactTypes = contactTypes;
            if(!$scope.entry.contactDetails.contactTypeGuid){
                $scope.entry.contactDetails.contactTypeGuid = contactTypes[0].contactTypeGuid;                
            }
        });
    }  
    
    $scope.getEntryTypes();
    if($rootScope.entriesFilter.entryTypeGuid === '1'){
        $scope.getDeficiencyStatuses();
    }  
    if($rootScope.entriesFilter.entryTypeGuid === '2'){
        $scope.getContactTypes();
    }  
        
    $scope.onEntryTypeChange = function(){
        $scope.entry.description = '';
        if($scope.entry.entryTypeGuid === '1'){
            $scope.getDeficiencyStatuses();
        }
        
        if($scope.entry.entryTypeGuid === '2'){
            $scope.getContactTypes();
        }        
    }
    
    $scope.onSave = function(){
        $scope.entry.groups = [];
        _.forEach($scope.selectedProjectGroups, function(projectGroup){
            $scope.entry.groups.push(projectGroup.groupGuid);
        });
 
        entriesService.createEntry({
            entryTypeGuid: $scope.entry.entryTypeGuid, 
            projectGuid: $rootScope.currentProjectGuid, 
            description: $scope.entry.description, 
            groups: $scope.entry.groups})
        .then(function(entryDetails){
            $scope.entryGuid = entryDetails.entryGuid;

            if($scope.entry.entryTypeGuid === '1'){
                $scope.entry.deficiencyDetails.parentEntryGuid = $scope.entryGuid;
                entriesService.createDeficiencyDetails($scope.entry.deficiencyDetails)                
                .then(function(deficiencyDetails){
                    $scope.onBack();
                    globalService.displayToast({
                        messageText: "New Deficiency has been created.",
                        messageType: "success"
                    });
                });                
            }
            
            if($scope.entry.entryTypeGuid === '2'){
                $scope.entry.contactDetails.parentEntryGuid = $scope.entryGuid;
                
                entriesService.createContactDetails($scope.entry.contactDetails)                
                .then(function(contactDetails){
                    $scope.onBack();
                    globalService.displayToast({
                        messageText: "New Contact has been created.",
                        messageType: "success"
                    });
                });                
            }            
        });             
    }
    
    function sendFile(file, dataURL, guid) {
        globalService.fileUploadToS3(file, dataURL, guid).then(function (data) {
            $scope.entry.contactDetails.photoS3ObjectKey = guid;
            globalService.generatePresignedUrlForS3(guid).then(function (data) {
                $scope.photoUrl = data.presignedUrl;
            });    
        });
    }

    $scope.onUpload = function (file) {
        var guid = globalService.generateGuid();

        globalService.preprocessImg(file, guid).then(function (dataURL) { sendFile(file, dataURL, guid) });
    };     
    
    $scope.onContactTypeChange = function(){
        var contactTypeGuid = $scope.entry.contactDetails.contactTypeGuid
        $scope.entry.contactDetails = {contactTypeGuid: contactTypeGuid};
    }
    
    $scope.onBack = function(){
        $state.go("app.entriesList");
    }     
}

entriesModule.controller('EntryNewCtrl', EntryNewCtrl);

