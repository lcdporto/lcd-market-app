(function () {
    'use strict';

    angular
        .module('app.market')
        .controller('MarketRaceController', Controller);

    /* @ngInject */
    function Controller(AccountsTable, $rootScope) {
        var vm = this;
        $rootScope.title = 'Market Race';

        activate();

        function activate() {
            vm.users = AccountsTable.$search({}).$then(function () {
                vm.maxBalance = 0;
                angular.forEach(vm.users, function (user) {
                    if (user.balance > vm.maxBalance) {
                        vm.maxBalance = user.balance;
                    }
                });
                vm.maxBalance *= 1.05;
            });
        }
    }
})();
