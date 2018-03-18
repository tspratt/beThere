/**
 * Created by Tracy on 10/19/2015.
 */
'use strict';
angular.module('beThere', [
	'ui.router',
	'ngStorage'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider) {
	$urlRouterProvider.otherwise('/log-in');
	$stateProvider
			.state('log-in', {
				url: '/log-in',
				templateUrl: '/views/log-in.html'
			})
			.state('event-list', {
				url: '/event-list',
				templateUrl: '/views/event-list.html',
				controller: 'EventCtrl'
			})
			.state('event-detail', {
				url: '/event-detail',
				templateUrl: '/views/event-detail.html',
				controller: 'EventCtrl'
			})
})
		.run(['$rootScope', function ($rootScope){
			$rootScope.errorStatus = '';
		}]);
