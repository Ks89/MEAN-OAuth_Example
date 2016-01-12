(function () {
  angular
  .module('mySiteApp')
  .service('authentication', authentication);

  authentication.$inject = ['$http'];
  function authentication ($http) {

    thirdPartyLogin = function(service) {
      return $http.get("/api/auth/" + service)
      .then(function successCallback(response) {
        console.log("http success response: ");
        console.log(response);
      }, function errorCallback(response) {
        console.log("http error response: ");
        console.log(response);
      });
    };

    return {
      thirdPartyLogin : thirdPartyLogin
    };
  }
})();