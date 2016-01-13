(function () {
	angular.module('mySiteApp', ['ngRoute', 'ngSanitize']);

	function config ($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/auth/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})
		.when('/profile', {
			templateUrl: '/profile/profile.view.html',
			controller: 'profileCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
		
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true,
			rewriteLinks: false
		});
	}

	angular
	.module('mySiteApp')
	.config(['$routeProvider', '$locationProvider', config]);

})();