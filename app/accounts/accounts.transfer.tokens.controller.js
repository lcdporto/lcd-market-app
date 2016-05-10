(function () {
    'use strict';

    angular
        .module('app.market')
        .controller('TransferTokensController', Controller);

    /* @ngInject */
    function Controller(TransfersTable, AccountsTable, $rootScope, $state, $http, AppSettings) {
        var vm = this;
        $rootScope.title = 'Transfer tokens';

        vm.transfer = TransfersTable.$build();

        vm.doTransfer = doTransfer;

        activate();

        function activate() {
            vm.accounts = AccountsTable.$search();
        }

        function doTransfer() {
            vm.transfer.$save().$then(function () {

                $http({
                    method: 'GET',
                    url: AppSettings.apiUrl + '/accounts/me/'
                }).then(function (response) {
                    var user = JSON.stringify(response);

                    localStorage.setItem('user', user);

                    $rootScope.authenticated = response;
                    $state.go('transfersList');

                });
            });
        }
    }
})();
