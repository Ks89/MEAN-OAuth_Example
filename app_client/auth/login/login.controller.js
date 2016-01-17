(function () {

  angular
  .module('mySiteApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in'
    };

    //using the working solution
    vm.facebookOauthUrl = 'api/auth/facebook';
    vm.googleOauthUrl = 'api/auth/google';
    vm.githubOauthUrl = 'api/auth/github';

    //using the not working solution
    vm.on3dPartyLogin = function (service) {
      console.log("on3dPartyLogin called service: " + service);
      authentication.thirdPartyLogin(service)
      .then(function(){
        console.log("on3dPartyLogin 'then' called");
      });
    };
  }

})();