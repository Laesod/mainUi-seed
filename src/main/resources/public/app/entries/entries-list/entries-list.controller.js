'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntriesListCtrl($scope, $state, $http, APP_SETTINGS, globalService, $window, entriesService) {

    var DynamicItems = function () {
        this.loadedPages = {};
        this.numItems = 0;
        this.PAGE_SIZE = 20;
        this.fetchNumItems_();
    };
    // Required.
    DynamicItems.prototype.getItemAtIndex = function (index) {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];
        if (page) {
            return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
            this.fetchPage_(pageNumber);
        }
    };
    // Required.
    DynamicItems.prototype.getLength = function () {
        return this.numItems;
    };
    DynamicItems.prototype.fetchPage_ = function (pageNumber) {
        // Set the page to null so we know it is already being fetched.
        this.loadedPages[pageNumber] = null;

        var getEntriesParams = {
            size: this.PAGE_SIZE,
            page: pageNumber,
            //  sort: prepareCurrentSortingParams(),
            //  description: $scope.searchCriteria
        };

        //prepareCurrentFilteringParams(getEntriesParams);
        entriesService.getEntries(getEntriesParams).then(angular.bind(this, function (data) {
            this.loadedPages[pageNumber] = [];
            var pageOffset = pageNumber * this.PAGE_SIZE;
            for (var i = 0; i < data.content.length; i++) {
                this.loadedPages[pageNumber].push(data.content[i]);
            }
        }));
    };
    DynamicItems.prototype.fetchNumItems_ = function () {
        var getEntriesParams = {
            size: 1,
            page: 0,
            // description: $scope.searchCriteria
        };

        // prepareCurrentFilteringParams(getEntriesParams);
        entriesService.getEntries(getEntriesParams).then(angular.bind(this, function (data) {
            this.numItems = data.totalElements;
        }));
    };

    var loadEntries = function () {
        $scope.entries = new DynamicItems();
    };

    loadEntries();

    $scope.onAdd = function () {
        $state.go("app.entryNew");
    }
}

entriesModule.controller('EntriesListCtrl', EntriesListCtrl);

