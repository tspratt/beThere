'use strict';
angular.module('beThere')
    .controller('LogInCtrl', ['$rootScope','$scope', '$state',
      function ($rootScope, $scope, $state) {
        $scope.vm = this;
        $scope.activeState = 'sign-in';
        $scope.vm.isLoggedIn = false;
        $scope.vm.username = '';
        $scope.vm.password = '';
        $scope.isFormValid = false;

        $scope.logIn = function (sState) {
          $scope.goView('event-list',{});
        };

        $scope.validateForm = function(){
          $scope.isFormValid = ($scope.vm.password.length > 0 || $scope.vm.password.length > 0)
        };

        function init() {
          $scope.validateForm()
        }

        $scope.goView = function (state, oParams) {
          $state.go(state, oParams, {});
        };

        init();
      }]);