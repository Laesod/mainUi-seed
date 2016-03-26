'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryDetailsCtrl($scope, $state, $stateParams, $rootScope, projectsService, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService) {
    var init = function(){
        $scope.entry = {deficiencyDetails: {}, contactDetails: {}};
        $scope.projectGuid = $rootScope.currentProjectGuid;
        $scope.selectedProjectGroups = [];
        $scope.entryGuid = $stateParams.entryGuid; 
        $scope.showBusyIndicator = true;   
        $scope.minDueDate = new Date();  
        
        entriesService.getEntry({entryGuid: $scope.entryGuid}).then(function(entryData){
            if(entryData.deficiencyDetails){
                $scope.getDeficiencyStatuses();
                if(entryData.deficiencyDetails.dueDate){
                    entryData.deficiencyDetails.dueDate = new Date(entryData.deficiencyDetails.dueDate);
                }
            }
            
            if($scope.entry.contactDetails){
                $scope.getContactTypes();
                if (entryData.contactDetails.photoS3ObjectKey) {
                    globalService.generatePresignedUrlForS3(entryData.contactDetails.photoS3ObjectKey).then(function (data) {
                        $scope.photoUrl = data.presignedUrl;
                    });
                } else {
                    $scope.photoUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
                }                
            }  
            
            $scope.entry = entryData; 
            
            $timeout(function() {
                $scope.showBusyIndicator = false;
            }, 300);                    
        })     
        
        entriesService.getEntryTypesForProject({ projectGuid: $rootScope.currentProjectGuid }).then(function (entryTypesForProject) {
            $scope.entryTypes = entryTypesForProject;
        }); 
        
        projectsService.getProjectGroups({ projectGuid: $rootScope.currentProjectGuid}).then(function (projectGroups) {
            $scope.projectGroups = projectGroups;
        });                 
    }
    
    init();
    
    $scope.getDeficiencyStatuses = function(){
        entriesService.getEntryStatuses({entryType: "Deficiency"}).then(function(deficiencyStatuses){
            $scope.deficiencyStatuses = deficiencyStatuses;
        })
    }  
    
    $scope.getContactTypes = function(){
        entriesService.getContactTypes().then(function(contactTypes){
            $scope.contactTypes = contactTypes;
           // $scope.entry.contactDetails.contactTypeGuid = contactTypes[0].contactTypeGuid;
        });
    }        
     
    $scope.searchProjectGroup = function(groupSearchText){
        return _.filter($scope.projectGroups, function(group){
            return group.groupName.indexOf(groupSearchText) > -1;
        })
    }    
    
    
    $scope.onSave = function(){
       var groups = [];
        _.forEach($scope.entry.groups, function(group){
            groups.push(group.groupGuid);
        });

        entriesService.updateEntry({
             entryGuid: $scope.entryGuid,
             entryTypeGuid: $scope.entry.entryTypeGuid, 
             projectGuid: $rootScope.currentProjectGuid,                 
             description: $scope.entry.description, 
             markedAsDeleted: $scope.entry.markedAsDeleted === true ? true : false,
             groups: groups})
         .then(function(){
             if($scope.entry.entryTypeGuid === '1'){
                $scope.entry.deficiencyDetails.parentEntryGuid = $scope.entryGuid;
                
                entriesService.updateDeficiencyDetails($scope.entry.deficiencyDetails)
                .then(function(){
                    globalService.displayToast({
                        messageText: "Deficiency has been modified.",
                        messageType: "success"
                    });
                    
                    $scope.onBack();
                });                  
             }
             
             if($scope.entry.entryTypeGuid === '2'){
                $scope.entry.contactDetails.parentEntryGuid = $scope.entryGuid; 
                 
                entriesService.updateContactDetails($scope.entry.contactDetails)
                .then(function(){
                    globalService.displayToast({
                        messageText: "Contact has been modified.",
                        messageType: "success"
                    });
                    
                    $scope.onBack();
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
    
    $scope.onBack = function(event){
        $timeout(function(){$state.go("app.entriesList");}, 200);
    }  
    
    $scope.onAdd = function() {
        $state.go("app.entryNew");
    }      
    
    $scope.onRefresh = function(){
        init();
    }      
}

entriesModule.controller('EntryDetailsCtrl', EntryDetailsCtrl);

