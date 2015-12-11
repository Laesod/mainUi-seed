'use strict';

var documentsModule = require('../_index');
var url = require('url');

function TasksListCtrl($scope, $timeout, $http, APP_SETTINGS, globalService, $window, $mdDialog, $mdMedia, tasksService) {
    $scope.selectedSortingCriterias = [{
        fieldName: "project (asc)",
        field: "project",
        selected: false,
        direction: 'asc'
    }, {
        fieldName: "type (asc)",
        field: "type",
        selected: false,
        direction: 'asc'
    }, {
        fieldName: "status (asc)",
        field: "status",
        selected: false,
        direction: 'asc'
    }, {
        fieldName: "created (desc)",
        field: "createdAt",
        selected: false,
        direction: 'desc'
    }];

    $scope.availableSortingCriterias = [{
        fieldName: "created (asc)",
        field: "createdAt",
        selected: false,
        direction: 'asc'
    }, {
        fieldName: "project (desc)",
        field: "project",
        selected: false,
        direction: 'desc'
    }, {
        fieldName: "type (desc)",
        field: "type",
        selected: false,
        direction: 'desc'
    }, {
        fieldName: "status (desc)",
        field: "status",
        selected: false,
        direction: 'desc'
    }];

    $scope.appliedFilters = {};

    var DynamicItems = function() {
        this.loadedPages = {};
        this.numItems = 0;
        this.PAGE_SIZE = 20;
        this.fetchNumItems_();
    };
    // Required.
    DynamicItems.prototype.getItemAtIndex = function(index) {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];
        if (page) {
            return page[index % this.PAGE_SIZE];
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
        // For demo purposes, we simulate loading more items with a timed
        // promise. In real code, this function would likely contain an
        // $http request.
        var sortingCriterias = [];
        if ($scope.selectedSortingCriterias.length) {
            for (var i = 0; i < $scope.selectedSortingCriterias.length; i++) {
                sortingCriterias.push($scope.selectedSortingCriterias[i].field + "," + $scope.selectedSortingCriterias[i].direction);
            }
        }

        var getTasksParams = {
            size: this.PAGE_SIZE,
            page: pageNumber,
            sort: sortingCriterias,
            description: $scope.searchCriteria
        };

        if (!angular.equals($scope.appliedFilters, {})) {
            for (var property in $scope.appliedFilters) {
                if ($scope.appliedFilters.hasOwnProperty(property)) {
                    var filterValues = [];
                    for (var i = 0; i < $scope.appliedFilters[property].length; i++) {
                        filterValues.push($scope.appliedFilters[property][i]);
                    }

                    getTasksParams[property] = filterValues;
                }
            }

        }

        tasksService.getTasks(getTasksParams).then(angular.bind(this, function(data) {
            this.loadedPages[pageNumber] = [];
            var pageOffset = pageNumber * this.PAGE_SIZE;
            for (var i = 0; i < data.content.length; i++) {
                this.loadedPages[pageNumber].push(data.content[i]);
            }
        }));
    };
    DynamicItems.prototype.fetchNumItems_ = function() {
        var getTasksParams = {
            size: 1,
            page: 1,
            description: $scope.searchCriteria
        };

        if (!angular.equals($scope.appliedFilters, {})) {
            for (var property in $scope.appliedFilters) {
                if ($scope.appliedFilters.hasOwnProperty(property)) {
                    var filterValues = [];
                    for (var i = 0; i < $scope.appliedFilters[property].length; i++) {
                        filterValues.push($scope.appliedFilters[property][i]);
                    }

                    getTasksParams[property] = filterValues;
                }
            }
        }

        tasksService.getTasks(getTasksParams).then(angular.bind(this, function(data) {
            this.numItems = data.totalElements;
        }));
    };

    var reloadEntries = function() {
        $scope.entries = new DynamicItems();
    };

    reloadEntries();
    var getEntyByIndex = function(index) {
        var pageNumber = Math.floor(index / $scope.entries.PAGE_SIZE);
        var itemNumber = index % $scope.entries.PAGE_SIZE;

        return $scope.entries.loadedPages[pageNumber][itemNumber];
    };
    /*    var changeEntryByIndex = function(index, newEntry) {
        var pageNumber = Math.floor(index / $scope.entries.PAGE_SIZE);
        var itemNumber = index % $scope.entries.PAGE_SIZE;

        $scope.entries.loadedPages[pageNumber][itemNumber] = newEntry;
    };*/
    /*    var removeEntyByIndex = function(index) {
        var pageNumber = Math.floor(index / $scope.entries.PAGE_SIZE);
        var itemNumber = index % $scope.entries.PAGE_SIZE;

        $scope.entries.loadedPages[pageNumber].splice(itemNumber, 1);
    };   */

    $scope.isOpen = false;

    var showTaskDetailsDialog = function(event, entry, index) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: APP_SETTINGS.contextPrefix + '/app/tasks/tasks-list/task-details-dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen,
            locals: {
                "entry": angular.copy(entry),
                "index": index
            }
        })
            .then(function(dialogReturns) {
                if (dialogReturns.index === undefined || dialogReturns.index === null) {
                    var creationDate = new Date();
                    tasksService.createTask({
                        payload: dialogReturns.entry
                    }).then(function() {
                        //$scope.entries.unshift(angular.copy(dialogReturns.entry));
                        reloadEntries();
                    });

                } else {
                    delete dialogReturns.entry['createdByUser'];
                    delete dialogReturns.entry['createdAt'];
                    delete dialogReturns.entry['modifiedByUser'];
                    delete dialogReturns.entry['modifiedAt'];

                    tasksService.changeTask({
                        guid: dialogReturns.entry.taskGuid,
                        payload: angular.copy(dialogReturns.entry)
                    }).then(angular.bind(this, function(data) {
                        reloadEntries();
                        // changeEntryByIndex(dialogReturns.index, angular.copy(dialogReturns.entry));
                    }));

                }
            }, function() {});
        $scope.$watch(function() {
            return $mdMedia('sm');
        }, function(sm) {
            $scope.customFullscreen = (sm === true);
        });
    };

    var showGridSettingsDialog = function(event, selectedSortingCriterias, availableSortingCriterias, appliedFilters) {
        $mdDialog.show({
            controller: GridSettingsDialogController,
            templateUrl: APP_SETTINGS.contextPrefix + '/app/tasks/tasks-list/grid-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.customFullscreen,
            locals: {
                "selectedSortingCriterias": angular.copy(selectedSortingCriterias),
                "availableSortingCriterias": angular.copy(availableSortingCriterias),
                "appliedFilters": angular.copy(appliedFilters)
            }
        })
            .then(function(dialogReturns) {
                var reloadNeeded = false;
                if (!angular.equals($scope.selectedSortingCriterias, dialogReturns.selectedSortingCriterias)) {
                    $scope.selectedSortingCriterias = dialogReturns.selectedSortingCriterias;
                    reloadNeeded = true;
                }
                if (!angular.equals($scope.availableSortingCriterias, dialogReturns.availableSortingCriterias)) {
                    $scope.availableSortingCriterias = dialogReturns.availableSortingCriterias;
                    reloadNeeded = true;
                }
                if (!angular.equals($scope.appliedFilters, dialogReturns.appliedFilters)) {
                    $scope.appliedFilters = dialogReturns.appliedFilters;
                    reloadNeeded = true;
                }

                if (reloadNeeded) {
                    reloadEntries();
                }

                // if (dialogReturns.index === undefined || dialogReturns.index === null) {
                //     var creationDate = new Date();
                //     dialogReturns.entry.created = creationDate.getFullYear() + '-' + creationDate.getMonth() + '-' + creationDate.getDate();
                //     $scope.entries.unshift(angular.copy(dialogReturns.entry));
                // } else {
                //     $scope.entries[index] = angular.copy(dialogReturns.entry);
                // }

                // $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                // $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('sm');
        }, function(sm) {
            $scope.customFullscreen = (sm === true);
        });
    };

    $scope.onAdd = function(event) {
        showTaskDetailsDialog(event);
    };

    $scope.onSettings = function(event) {
        showGridSettingsDialog(event, $scope.selectedSortingCriterias, $scope.availableSortingCriterias, $scope.appliedFilters);
    };

    $scope.onEdit = function(event, index) {
        showTaskDetailsDialog(event, getEntyByIndex(index), index);
    };

    $scope.onDelete = function(index) {
        var getEntryByIndex = getEntyByIndex(index);

        tasksService.deleteTask({
            guid: getEntryByIndex.taskGuid
        }).then(angular.bind(this, function() {
            reloadEntries();
        }));
    };

    $scope.onKeyPress = function(event) {
        if (event.keyCode === 13) {
            reloadEntries();
        }
    };
}

documentsModule.controller('TasksListCtrl', TasksListCtrl);

function DialogController($scope, $mdDialog, entry, index) {
    $scope.popupHeader = "Add a new entry";
    $scope.entry = entry;

    if (!$scope.entry) {
        $scope.entry = {};
    } else {
        $scope.popupHeader = "Edit an entry";
    }

    $scope.types = [{
        description: "Task"
    }, {
        description: "Info"
    }];

    $scope.statuses = [{
        description: "1. Open"
    }, {
        description: "2. In Progress"
    }, {
        description: "3. Done"
    }];

    $scope.projects = [{
        description: "Personal"
    }, {
        description: "Work"
    }];

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.returnEntry = function() {
        if (index !== undefined || index !== null) {
            $mdDialog.hide({
                entry: $scope.entry,
                index: index
            });
        } else {
            $mdDialog.hide({
                // entry: $scope.entry
            });
        }
    };
}

function GridSettingsDialogController($scope, $mdDialog, selectedSortingCriterias, availableSortingCriterias, appliedFilters) {
    if (!angular.equals(appliedFilters, {})) {
        $scope.appliedFilters = angular.copy(appliedFilters);
    } else {
        $scope.appliedFilters = {
            /*            createdFrom: new Date(),
            createdTo: new Date()*/
        };
    }

    $scope.types = [{
        description: "Task"
    }, {
        description: "Info"
    }];

    $scope.statuses = [{
        description: "1. Open"
    }, {
        description: "2. In Progress"
    }, {
        description: "3. Done"
    }];

    $scope.projects = [{
        description: "Personal"
    }, {
        description: "Work"
    }];

    $scope.popupHeader = "Grid settings";

    if (!selectedSortingCriterias.length) {
        $scope.selectedSortingCriterias = [{
            fieldName: "project (asc)",
            field: "project",
            selected: false,
            direction: 'asc'
        }, {
            fieldName: "type (asc)",
            field: "type",
            selected: false,
            direction: 'asc'
        }, {
            fieldName: "status (asc)",
            field: "status",
            selected: false,
            direction: 'asc'
        }, {
            fieldName: "created (desc)",
            field: "createdAt",
            selected: false,
            direction: 'desc'
        }];
    } else {
        $scope.selectedSortingCriterias = selectedSortingCriterias;
    }

    if (!availableSortingCriterias.length) {
        $scope.availableSortingCriterias = [{
            fieldName: "created (asc)",
            field: "createdAt",
            selected: false,
            direction: 'asc'
        }, {
            fieldName: "project (desc)",
            field: "project",
            selected: false,
            direction: 'desc'
        }, {
            fieldName: "type (desc)",
            field: "type",
            selected: false,
            direction: 'desc'
        }, {
            fieldName: "status (desc)",
            field: "status",
            selected: false,
            direction: 'desc'
        }];
    } else {
        $scope.availableSortingCriterias = availableSortingCriterias;
    }

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.isAddSortingCriteriaDisabled = true;
    $scope.selectedAvailableSortingCriteriaIndex = -1;
    $scope.isRemoveSortingCriteriaDisabled = true;
    $scope.selectedSelectedSortingCriteriaIndex = -1;

    $scope.onSelectSortingCriteria = function(index, listId) {
        if (listId === 'available') {
            $scope.availableSortingCriterias[index].selected = !$scope.availableSortingCriterias[index].selected;
            $scope.isAddSortingCriteriaDisabled = true;
            $scope.selectedAvailableSortingCriteriaIndex = -1;
            for (var i = 0; i < $scope.availableSortingCriterias.length; i++) {
                if ($scope.availableSortingCriterias[i].selected) {
                    $scope.isAddSortingCriteriaDisabled = false;
                    $scope.selectedAvailableSortingCriteriaIndex = i;
                }
                if (i !== index) {
                    $scope.availableSortingCriterias[i].selected = false;
                }
            }
        }
        if (listId === 'selected') {
            $scope.selectedSortingCriterias[index].selected = !$scope.selectedSortingCriterias[index].selected;
            $scope.isRemoveSortingCriteriaDisabled = true;
            $scope.selectedSelectedSortingCriteriaIndex = -1;
            for (var i = 0; i < $scope.selectedSortingCriterias.length; i++) {
                if ($scope.selectedSortingCriterias[i].selected) {
                    $scope.isRemoveSortingCriteriaDisabled = false;
                    $scope.selectedSelectedSortingCriteriaIndex = i;
                }
                if (i !== index) {
                    $scope.selectedSortingCriterias[i].selected = false;
                }
            }
        }
    };

    $scope.onAddSorting = function() {
        $scope.availableSortingCriterias[$scope.selectedAvailableSortingCriteriaIndex].selected = false;

        $scope.selectedSortingCriterias.push($scope.availableSortingCriterias[$scope.selectedAvailableSortingCriteriaIndex]);
        $scope.availableSortingCriterias.splice($scope.selectedAvailableSortingCriteriaIndex, 1);

        $scope.isAddSortingCriteriaDisabled = true;
        $scope.selectedAvailableSortingCriteriaIndex = -1;
    };

    $scope.onRemoveSorting = function() {
        $scope.selectedSortingCriterias[$scope.selectedSelectedSortingCriteriaIndex].selected = false;

        $scope.availableSortingCriterias.push($scope.selectedSortingCriterias[$scope.selectedSelectedSortingCriteriaIndex]);
        $scope.selectedSortingCriterias.splice($scope.selectedSelectedSortingCriteriaIndex, 1);

        $scope.isRemoveSortingCriteriaDisabled = true;
        $scope.selectedSelectedSortingCriteriaIndex = -1;
    };

    $scope.returnEntry = function() {
        $mdDialog.hide({
            selectedSortingCriterias: $scope.selectedSortingCriterias,
            availableSortingCriterias: $scope.availableSortingCriterias,
            appliedFilters: $scope.appliedFilters
        });
    };
}