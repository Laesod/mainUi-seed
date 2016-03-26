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
        $scope.showViewContentBlocker = true; 
        $timeout(function(){$scope.showViewContentBlocker = false}, 500); //due to the error on mobile phone and input focus after navigation...
        $scope.comment = {parentEntity: 'Entry', parentEntityGuid: $scope.entryGuid};   
        //$scope.comments = [];  
        
        entriesService.getEntry({entryGuid: $scope.entryGuid}).then(function(entryData){
            if(entryData.entryTypeGuid === '1'){
                $scope.getDeficiencyStatuses();
                if(entryData.deficiencyDetails.dueDate){
                    entryData.deficiencyDetails.dueDate = new Date(entryData.deficiencyDetails.dueDate);
                }
            }
            
            if(entryData.entryTypeGuid === '2'){
                $scope.getContactTypes();
                if (entryData.contactDetails.photoS3ObjectKey) {
                    globalService.generatePresignedUrlForS3(entryData.contactDetails.photoS3ObjectKey).then(function (data) {
                        $scope.photoUrl = data.presignedUrl;
                    });
                } else {
                    $scope.photoUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
                }                
            }  
            
            if(entryData.comments){
                _.forEach(entryData.comments, function(comment){
                    if(comment.creatorAvatar){
                        globalService.generatePresignedUrlForS3(comment.creatorAvatar).then(function (data) {
                            var filteredComments = _.filter(entryData.comments, function(item){
                                return item.creatorAvatar === data.initialS3ObjectKey;
                            })
                            
                            _.forEach(filteredComments, function(filteredComment){
                                filteredComment.creatorAvatarUrl = data.presignedUrl;
                            });
                        });                          
                    }
                });
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
    
    $scope.onAddComment = function(){
        entriesService.createComment($scope.comment).then(function(comment){
            if (comment.creatorAvatar) {
                globalService.generatePresignedUrlForS3(comment.creatorAvatar).then(function(data) {
                    comment.creatorAvatarUrl = data.presignedUrl;
                });
            } else {
                comment.creatorAvatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
            }            
            
            if(!$scope.entry.comments){
                $scope.entry.comments = [];
            }
            $scope.entry.comments.unshift(comment);
            
           globalService.displayToast({
               messageText: "Comment has been added.",
               messageType: "success"
           });            
        })
    }  
    
    $scope.onBack = function(event){
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

