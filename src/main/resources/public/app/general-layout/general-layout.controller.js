'use strict';

var generalLayoutModule = require('./_index');

function GeneralLayoutCtrl($scope, $window, APP_SETTINGS, globalService, $cookies, $mdSidenav) {
    $scope.currentLanguageCode = APP_SETTINGS.appLanguage.toUpperCase();

    $scope.logout = function() {
        var url = APP_SETTINGS.apiUrl.authUrl + "/#/login?location=" + encodeURIComponent($window.location.origin + $window.location.pathname + $window.location.hash);
        globalService.logout().then(function() {
            $window.location.href = url;
        }, function() {
            $window.location.href = url;
        });
    };

    $scope.changeLanguage = function() {
        if ($scope.currentLanguageCode == "EN") {
            $cookies.put("appLanguage", "fr");
        } else {
            $cookies.put("appLanguage", "en");
        }

        $window.location.reload();
    };

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      };
    }

    $scope.toggleLeft = buildToggler('leftSideNav');    
}

generalLayoutModule.controller('GeneralLayoutCtrl', GeneralLayoutCtrl);

function LeftSideNavCtrl($scope, $mdSidenav, $state) {
    $scope.close =  $mdSidenav('leftSideNav').close;

    $scope.onManageProfile = function(){
        $scope.close();
        $state.go("app.profileDetails");
    };

    $scope.onListOfTasks = function(){
        $scope.close();        
        $state.go("app.tasksList");
    };
    
    $scope.onListOfProjects = function(){
        $scope.close();        
        $state.go("app.projectsList");       
    }
} 


generalLayoutModule.controller('LeftSideNavCtrl', LeftSideNavCtrl);


