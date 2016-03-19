'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryNewCtrl($rootScope, $scope, $state, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService, projectsService) {
    $scope.groupSearchText = "";
    $scope.selectedProjectGroups = [];

     $scope.entry = {
         groups: [],
         deficiencyDetails: {}
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
    
    $scope.onEntryTypeChange = function(){
        if($scope.entry.entryTypeGuid === '1'){
            entriesService.getEntryStatuses({entryType: "Deficiency"}).then(function(deficiencyStatuses){
               $scope.deficiencyStatuses = deficiencyStatuses;
               $scope.entry.deficiencyDetails.entryStatusGuid = deficiencyStatuses[0].entryStatusGuid;
            });            
        }
    }
    
    $scope.onSaveEntryDetails = function(){
        $scope.entry.groups = [];
        _.forEach($scope.selectedProjectGroups, function(projectGroup){
            $scope.entry.groups.push(projectGroup.groupGuid);
        });
 
        if(!$scope.entryGuid){
            entriesService.createEntry({
                entryTypeGuid: $scope.entry.entryTypeGuid, 
                projectGuid: $rootScope.currentProjectGuid, 
                description: $scope.entry.description, 
                groups: $scope.entry.groups})
            .then(function(entryDetails){
                $scope.entryGuid = entryDetails.entryGuid;
                
                globalService.displayToast({
                    messageText: "New entry has been created.",
                    messageType: "success"
                });
                
                $scope.onSaveDeficiencyDetails();                
            });             
        }else{
            entriesService.updateEntry({
                entryGuid: $scope.entryGuid,
                entryTypeGuid: $scope.entry.entryTypeGuid, 
                projectGuid: $rootScope.currentProjectGuid,                 
                description: $scope.entry.description, 
                groups: $scope.entry.groups})
            .then(function(){
                globalService.displayToast({
                    messageText: "Entry has been modified.",
                    messageType: "success"
                });
            });            
        }
    }
    
    $scope.onSaveDeficiencyDetails = function(){
        if(!$scope.deficiencyDetailsGuid){
            entriesService.createDeficiencyDetails({
                parentEntryGuid: $scope.entryGuid, 
                entryStatusGuid: $scope.entry.deficiencyDetails.entryStatusGuid
            })
            .then(function(deficiencyDetails){
                $scope.deficiencyDetailsGuid = deficiencyDetails.deficiencyDetailsGuid;
                
                globalService.displayToast({
                    messageText: "Deficiency details have been added.",
                    messageType: "success"
                });
            });            
        }  else{
            entriesService.updateDeficiencyDetails({
                deficiencyDetailsGuid: $scope.deficiencyDetailsGuid,
                parentEntryGuid: $scope.entryGuid, 
                entryStatusGuid: $scope.entry.deficiencyDetails.entryStatusGuid
            })
            .then(function(){
                globalService.displayToast({
                    messageText: "Deficiency details have been modified.",
                    messageType: "success"
                });
            });              
        }      
    }
    
    $scope.onBack = function(){
        $state.go("app.entriesList");
    }     
}

entriesModule.controller('EntryNewCtrl', EntryNewCtrl);

