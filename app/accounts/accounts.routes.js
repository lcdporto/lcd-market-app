(function() {
    'use strict';

    angular
        .module('app.accounts')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'transfersList',
                config: {
                    url: '/mybalance',
                    templateUrl: 'app/accounts/accounts.transfers.view.html',
                    controller: 'TransfersListController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'transferTokens',
                config: {
                    url: '/transfer-tokens',
                    templateUrl: 'app/accounts/accounts.transfer.tokens.view.html',
                    controller: 'TransferTokensController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
