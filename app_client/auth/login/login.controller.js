(function () {

  angular
  .module('mySiteApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in'
    };
    vm.on3dPartyLogin = function (service) {
      console.log("on3dPartyLogin called service: " + service);
      authentication.thirdPartyLogin(service)
      .then(function(){
        console.log("on3dPartyLogin 'then' called");
      });
    };
  }

})();