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
                    url: '/transferencias',
                    templateUrl: 'app/accounts/accounts.transfers.view.html',
                    controller: 'TransfersListController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
