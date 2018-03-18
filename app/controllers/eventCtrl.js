angular.module('beThere')
		.controller('EventCtrl', ['$rootScope', '$scope', '$state', 'EventService',
			function ($rootScope, $scope, $state, EventService) {
				$scope.vm = {};
				$scope.selectedEvent = null;

				function init() {
					getEvents();
				}

				function getEvents() {
					$scope.event = null;
					$scope.selectedId = '';
					EventService.listEvents()
							.then((res) => {
								if (res.status === 200) {
									$scope.events = res.data;
									//buildDisplayList();
								}
							});
				}

				$scope.showDetail = function (event) {
					$scope.selectedEvent = event;
					EventService.getMedia(event.eventId, event.mediaId)
							.then ((res) => {
								if (res.status === 200) {
									$scope.selectedEvent.imgUrl = res.data.imgUrl;
								}
							});
					EventService.getEventStatus(event.eventId, $rootScope)
							.then ((res) => {
								if (res.status === 200) {
									$scope.selectedEvent.status = res.data.status;
								}
							})
					$state.go('event-detail');
				};

				init();
			}]);
