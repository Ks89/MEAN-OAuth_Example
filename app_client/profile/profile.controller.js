(function () {

  angular
    .module('mySiteApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location'];
  function profileCtrl($location) {
    var vm = this;

    vm.pageHeader = 'Succes redirect called';
  }

})();