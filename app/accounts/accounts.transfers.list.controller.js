(function () {
    'use strict';

    angular
        .module('app.market')
        .controller('TransfersListController', Controller);

    /* @ngInject */
    function Controller(TransfersTable, $rootScope) {
        var vm = this;
        $rootScope.title = 'Transfers';

        activate();

        function activate() {
            vm.transfers = TransfersTable.$search({
                'target_account': $rootScope.authenticated.data.id
            }).$then(function () {
                delete vm.transfers.$params['target_account'];
                vm.transfers.$params.account = $rootScope.authenticated.data.id;
                vm.transfers.$fetch();
            });
        }
    }
})();
