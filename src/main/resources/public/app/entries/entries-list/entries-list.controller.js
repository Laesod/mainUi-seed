'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntriesListCtrl($scope, $rootScope, $state, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService) {
    $scope.entries = [];
    //$scope.showNoDataLabel = false;   
    var DynamicItems = function() {
        this.loadedPages = {};
        this.numItems = 0;
        this.PAGE_SIZE = 40;
        this.fetchNumItems_();
    };
    // Required.
    DynamicItems.prototype.getItemAtIndex = function(index) {
        var pageNumber = Math.floor((index) / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];
        if (page) {
            return page[(index) % this.PAGE_SIZE];
        } else if (page !== null) {
            this.fetchPage_(pageNumber);
        }
    };
    // Required.
    DynamicItems.prototype.getLength = function() {
        return this.numItems;
    };
    DynamicItems.prototype.fetchPage_ = function(pageNumber) {
        // Set the page to null so we know it is already being fetched.
        this.loadedPages[pageNumber] = null;

        var getEntriesParams = {
            size: this.PAGE_SIZE,
            page: pageNumber,
            projectGuid: $rootScope.currentProjectGuid,
            entryTypeGuid: $rootScope.entriesFilter.entryTypeGuid
            //  sort: prepareCurrentSortingParams(),
            //  description: $scope.searchCriteria
        };

        //prepareCurrentFilteringParams(getEntriesParams);
        entriesService.getEntries({ urlParams: getEntriesParams }).then(angular.bind(this, function(data) {
            this.loadedPages[pageNumber] = [];
            var pageOffset = pageNumber * this.PAGE_SIZE;
            for (var i = 0; i < data.content.length; i++) {
                this.loadedPages[pageNumber].push(data.content[i]);
            }
            $timeout(function() {
                $scope.showBusyIndicator = false;
            }, 200);
        }));
    };
    DynamicItems.prototype.fetchNumItems_ = function() {
        var getEntriesParams = {
            size: 1,
            page: 0,
            projectGuid: $rootScope.currentProjectGuid,
            entryTypeGuid: $rootScope.entriesFilter.entryTypeGuid            
            // description: $scope.searchCriteria
        };

        // prepareCurrentFilteringParams(getEntriesParams);
        entriesService.getEntries({ urlParams: getEntriesParams }).then(angular.bind(this, function(data) {
            this.numItems = data.totalElements;
            if (!this.numItems) {
                $timeout(function() {
                    $scope.showBusyIndicator = false;
                }, 200);
            }
        }));
    };

    var loadEntries = function() {
        $scope.showBusyIndicator = true;
        $scope.entries = new DynamicItems();
    };

    loadEntries();

    $scope.onAdd = function() {
        $state.go("app.entryNew");
    } 

    $scope.onFilter = function() {
        $state.go("app.entriesFilter");
    }

    var getEntyByIndex = function(index) {
        var pageNumber = Math.floor(index / $scope.entries.PAGE_SIZE);
        var itemNumber = index % $scope.entries.PAGE_SIZE;

        return $scope.entries.loadedPages[pageNumber][itemNumber];
    };

    $scope.onEdit = function(index) {
        $timeout(function() { $state.go("app.entryDetails", { entryGuid: getEntyByIndex(index).entryGuid }); }, 300)
    }

    $scope.onRefresh = function() {
        loadEntries();
    }
}

entriesModule.controller('EntriesListCtrl', EntriesListCtrl);

