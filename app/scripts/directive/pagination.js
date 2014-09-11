/**
 * Created by root on 09/09/14.
 */
'use strict';

projetApp.directive('pagination', function () {
    return {

        link: function (scope, element, attrs) {
            console.log('start dir');
            scope.totalItems = 0;
            scope.currentPage = 0;
            if (angular.isDefined(attrs.sizepage)) scope.pageSize = attrs.sizepage;
            else scope.pageSize = 10;
            scope.pageData = [];
            scope.allData = [];
            scope.listName = attrs.list;

            scope.$watch('currentPage', function (value) {
                if (angular.isDefined(scope.allData) && scope.allData.length > 0) {
                    scope.pageData = scope.allData.slice((value - 1) * scope.pageSize, (value - 1) * scope.pageSize + scope.pageSize);
                }
            });

            scope.$watchCollection(attrs.list, function (value) {
                if (!angular.isUndefined(value)) {
                    scope.allData = value;
                    scope.defaultData = value;
                } else {
                    scope.allData = [];
                    scope.defaultData = [];
                }
            });

            scope.$watchCollection('allData', function (value) {

                if (angular.isDefined(value) && value.length > 0) {
                    scope.totalItems = value.length;
                    if (scope.currentPage === 1) {
                        scope.pageData = scope.allData.slice((scope.currentPage - 1) * scope.pageSize, (scope.currentPage - 1) * scope.pageSize + scope.pageSize);
                    } else {
                        scope.currentPage = 1;
                    }

                } else {
                    scope.pageData = [];
                }
            });


        }
    };
});