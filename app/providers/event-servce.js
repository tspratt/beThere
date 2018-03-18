'use strict';
angular.module('beThere')
		.factory('EventService', ['$rootScope', '$http', '$timeout', '$localStorage', '$q', function ($rootScope, $http, $timeout, $localStorage, $q) {
			const storage = $localStorage;
			const EventService = {};
			const SERVICE_URL_BASE = 'http://dev.dragonflyathletics.com:1337/api/dfkey/';

			EventService.listEvents = function (userName) {

				return $http.get(SERVICE_URL_BASE + 'events?username=tracy&password=evalpass'/*,{
					headers: {
						username: 'tspratt@gmail.com',
						password: 'evalpass'
					}
				}*/)
						.then(function (res) {
									setLocalEvents($rootScope, res.data);
									return res.data;
								},
								function (res) {
									displayMessage('Service Unavailable', 3000);
									return $q.when({status: 200, data: getLocalEvents(userName)});
								})
						.catch(function (res) {
							displayMessage('Service Unavailable', 3000);
							return $q.when({status: 200, data: getLocalEvents(userName)});
						});
			};

			EventService.getMedia = function (eventId, mediaId) {
				return $http.get(SERVICE_URL_BASE + 'events/' + eventId + '/media/' + mediaId)
						.then(function (res) {
									return res.data;
								},
								function (res) {
									displayMessage('Service Error', 3000);
									return res;
								})
						.catch(function (res) {
							displayMessage('Service Error', 3000);
							return res;
						});
			};

			EventService.getEventStatus = function (eventId, userName) {
				return $http.get(SERVICE_URL_BASE + 'events/' + eventId + '/status/' + userName)
						.then(function (res) {
							return res.data;
						})
						.catch(function (res) {
							displayMessage('Service Error', 3000);
							return res;
						});
			};

			EventService.saveEvent = function (eventId, userName, coming) {
				var oBody = {"coming": coming};
				return $http.put(SERVICE_URL_BASE + 'events/' + eventId + '/status/' + userName, oBody)
						.then((res) => {return res.data;},
								(res) => {
									if (res.status === 401) {
										displayMessage('Event Saved', 3000);
										return {status: 200};
									}
									else {
										displayMessage('Service Error', 3000);
										return res;
									}

								})
						.catch(function (res) {
							displayMessage('Service Error', 3000);
							return res;
						});
			};

			function displayMessage(errText, duration) {
				duration = duration || 0;
				$rootScope.userMessage = errText;
				$timeout(()=> {
					$rootScope.userMessage = '';
				}, duration);
			}

			function setLocalEvents($rootScope, events) {
				if (!storage.events) {storage.events = {}}
				storage.events[$rootScope] = events;
			}

			function getLocalEvents(userName) {
				let events = storage.events;
				if (!events ) {
					setLocalEvents (userName, simEvents())
				}
				events = storage.events[userName] || [];
				return events;
			}

			function simEvents() {
				return [
					{eventId: 0,
						description: 'event 1',
						thumbUrl: '/images/glyphicons-3-dog.png',
						mediaId: 111},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 2, description: 'event 3: SEE MY DETAIL!',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 333, status: true},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-4-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-2-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-1-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
					{eventId: 1, description: 'event 2',thumbUrl: '/images/glyphicons-3-dog.png', mediaId: 222},
				]


			}

			return EventService;
		}]);
