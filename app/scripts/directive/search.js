/**
 * Created by root on 10/09/14.
 */
'use strict';

projetApp.directive('searchintable', function ($filter) {
    return {
        link: function (scope, element, attrs) {
            scope.defaultData = [];

            scope.$watch('searchedWord', function (value) {
                scope.allData = $filter('filter')(scope.defaultData, value);
            });

        }
    };
});