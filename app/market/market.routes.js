(function() {
    'use strict';

    angular
        .module('app.market')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'market',
                config: {
                    url: '/market',
                    templateUrl: 'app/market/market.list.html',
                    controller: 'MarketListController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

    // @TODO change - to / in the urls
})();
