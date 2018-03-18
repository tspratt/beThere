angular.module('beThere')
		.controller('EventDetailCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'EventService',
			function ($rootScope, $scope, $state, $stateParams, EventService) {
				$scope.vm = {};
				$scope.event = $stateParams.event;

				$scope.setStatus = function (coming) {
					EventService.saveEvent(event.eventId, $rootScope.userName, coming)
							.then ((res) => {
								if (res.status === 200) {
									//do anything?
								}
							});
				};

				function init() {
					getEventDetail($scope.event);
				}

				function getEventDetail(event) {
					EventService.getMedia(event.eventId, event.mediaId)
							.then ((res) => {
								if (res.status === 200) {
									$scope.event.imgUrl = res.data.imgUrl;
								}
							});
					EventService.getEventStatus(event.eventId, $rootScope.userName)
							.then ((res) => {
								if (res.status === 200) {
									$scope.event.status = res.data.status;
								}
							})
				}

				$scope.goEvents = () => {$state.go('event-list')};

				init();
			}]);
