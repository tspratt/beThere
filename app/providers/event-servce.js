'use strict';
angular.module('beThere')
		.factory('EventService', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
			var EventService = {};
			var SERVICE_URL_BASE = 'http://dev.dragonflyathletics.com:1337/api/dfkey/';
			var loggedInUser = '';

			function logError (errText, duration) {
				duration = duration || 0;
				$rootScope.errorStatus = errText;
				$timeout(()=>{$rootScope.errorStatus = '';},duration);
			}

			EventService.listEvents = function () {
				return $q.when({status:200, data:[{eventId:0,description:'event 1',mediaId:111},{eventId:1,description:'event 2',mediaId:222},{eventId:2,description:'event 3',mediaId:333}]});
				/*
				return $http.get(SERVICE_URL_BASE + 'events?username=tracy&password=evalpass')
						.then(function (res) {
									return res.data;
								},
								function (res) {
									logError('Service Error',5000);
									return res;
								})
						.catch(function (res) {
							logError('Service Error',5000);
							return res;
						});
						*/
			};

			EventService.getMedia = function (eventId, mediaId) {
				return $http.get(SERVICE_URL_BASE + 'events/' + eventId + '/media/' + mediaId)
						.then(function (res) {
									return res.data;
								},
								function (res) {
									logError('Service Error',5000);
									return res;
								})
						.catch(function (res) {
							logError('Service Error',5000);
							return res;
						});
			};

			EventService.getEventStatus = function (eventId, userName) {
				return $http.get(SERVICE_URL_BASE + 'events/' + eventId + '/status/' + userName)
						.then(function (res) {
							return res.data;
						})
						.catch(function (res) {
							logError('Service Error',5000);
							return res;
						});
			};

			EventService.saveEvent = function (eventId, userName, coming) {
				var oBody = {"coming": coming};
				return $http.put(SERVICE_URL_BASE + 'events/' + eventId + '/status/' + userName, oBody)
						.then(function (res) {
							return res.data;
						})
						.catch(function (res) {
							logError('Service Error',5000);
							return res;
						});
			};
			return EventService;
		}]);
