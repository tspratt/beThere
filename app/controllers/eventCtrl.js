angular.module('beThere')
		.controller('EventCtrl', ['$rootScope', '$scope', '$state', 'EventService',
			function ($rootScope, $scope, $state, EventService) {
				$scope.vm = {};

				function init() {
					getEvents();
				}

				function getEvents() {
					$scope.event = null;
					$scope.selectedId = '';
					EventService.listEvents($rootScope.userName)
							.then((res) => {
								if (res.status === 200) {
									$scope.events = res.data;
									//buildDisplayList();
								}
							});
				}

				$scope.showDetail = function (event) {
					$state.go('event-detail', {event:event});
				};

				$scope.goEvents = () => {$state.go('event-list')};

				init();
			}]);
