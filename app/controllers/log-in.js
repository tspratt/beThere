'use strict';
angular.module('beThere')
		.controller('LogInCtrl', ['$rootScope', '$scope', '$state', '$localStorage',
			function ($rootScope, $scope, $state, $localStorage) {
				const storage = $localStorage;
				$scope.vm = this;
				$scope.activeState = 'sign-in';
				$scope.vm.isLoggedIn = false;
				$scope.vm.userName = '';
				$scope.vm.password = '';
				$scope.vm.rememberMe = false;
				$scope.vm.isFormValid = false;

				$scope.logIn = function () {
					$rootScope.userName = $scope.vm.userName;
					storage.rememberMe = $scope.vm.rememberMe;
					if($scope.vm.rememberMe) {
						storage.userName = $scope.vm.userName;
						storage.password = $scope.vm.password;
					}
					else {
						delete storage.userName;
						delete storage.password;
						$scope.vm.userName = '';
						$scope.vm.password = '';
					}

					$scope.goView('event-list', {});
				};

				$scope.validateForm = function () {
					$scope.vm.isFormValid = ($scope.vm.password.length > 0 || $scope.vm.password.length > 0)
				};

				function init() {
					$scope.vm.rememberMe = storage.rememberMe;
					if ($scope.vm.rememberMe) {
						$scope.vm.userName = storage.userName;
						$scope.vm.password = storage.password;
						$scope.validateForm();
					}
					$scope.validateForm()
				}

				$scope.goView = function (state, oParams) {
					$state.go(state, oParams, {});
				};

				init();
			}]);