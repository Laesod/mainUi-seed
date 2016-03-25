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
    
    $scope.onBack = function(event){
        $state.go("app.entriesList");
        event.stopPropagation();
    }  
    
    $scope.onAdd = function() {
        $state.go("app.entryNew");
    }      
    
    $scope.onRefresh = function(){
        init();
    }      
}

entriesModule.controller('EntryDetailsCtrl', EntryDetailsCtrl);

