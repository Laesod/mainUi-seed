'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryNewCtrl($rootScope, $scope, $state, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService, projectsService) {
    $scope.groupSearchText = "";
    $scope.selectedProjectGroups = [];

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
            $scope.entry.contactDetails.contactTypeGuid = contactTypes[0].contactTypeGuid;
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
                entriesService.createDeficiencyDetails({
                    parentEntryGuid: $scope.entryGuid, 
                    entryStatusGuid: $scope.entry.deficiencyDetails.entryStatusGuid
                })                
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
    
    $scope.onContactTypeChange = function(){
        var contactTypeGuid = $scope.entry.contactDetails.contactTypeGuid
        $scope.entry.contactDetails = {contactTypeGuid: contactTypeGuid};
    }
    
    $scope.onBack = function(){
        $state.go("app.entriesList");
    }     
}

entriesModule.controller('EntryNewCtrl', EntryNewCtrl);

