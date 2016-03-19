'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryDetailsCtrl($scope, $state, $stateParams, $rootScope, projectsService, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService) {
    var init = function(){
        $scope.entry = {};
        $scope.projectGuid = $rootScope.currentProjectGuid;
        $scope.selectedProjectGroups = [];
        $scope.entryGuid = $stateParams.entryGuid;      
        
        entriesService.getEntry({entryGuid: $scope.entryGuid}).then(function(entryData){
            $scope.entry = entryData;
            
            if($scope.entry.deficiencyDetails){
                $scope.getDeficiencyStatuses();
            }
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
             entriesService.updateDeficiencyDetails({
                 deficiencyDetailsGuid: $scope.entry.deficiencyDetails.deficiencyDetailsGuid,
                 parentEntryGuid: $scope.entryGuid, 
                 entryStatusGuid: $scope.entry.deficiencyDetails.entryStatusGuid
             })
             .then(function(){
                 globalService.displayToast({
                     messageText: "Entry has been modified.",
                     messageType: "success"
                 });
              });              
         });         
    }
    
    // $scope.onSaveEntryDetails = function(){
    //    var groups = [];
    //     _.forEach($scope.entry.groups, function(group){
    //         groups.push(group.groupGuid);
    //     });

    //     entriesService.updateEntry({
    //          entryGuid: $scope.entryGuid,
    //          entryTypeGuid: $scope.entry.entryTypeGuid, 
    //          projectGuid: $rootScope.currentProjectGuid,                 
    //          description: $scope.entry.description, 
    //          markedAsDeleted: $scope.entry.markedAsDeleted === true ? true : false,
    //          groups: groups})
    //      .then(function(){
    //          globalService.displayToast({
    //              messageText: "Entry has been modified.",
    //              messageType: "success"
    //          });
    //      });         
    //  }
    
    // $scope.onSaveDeficiencyDetails = function(){
    //     entriesService.updateDeficiencyDetails({
    //         deficiencyDetailsGuid: $scope.entry.deficiencyDetails.deficiencyDetailsGuid,
    //         parentEntryGuid: $scope.entryGuid, 
    //         entryStatusGuid: $scope.entry.deficiencyDetails.entryStatusGuid
    //     })
    //     .then(function(){
    //         globalService.displayToast({
    //             messageText: "Deficiency details have been modified.",
    //             messageType: "success"
    //         });
    //     });              
    // }
    
    $scope.onBack = function(){
        $state.go("app.entriesList");
    }  
    
    $scope.onAdd = function() {
        $state.go("app.entryNew");
    }      
    
    $scope.onRefresh = function(){
        init();
    }      
}

entriesModule.controller('EntryDetailsCtrl', EntryDetailsCtrl);

