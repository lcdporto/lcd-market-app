(function () {
    'use strict';

    angular
        .module('app.market')
        .controller('MarketListController', Controller);

    /* @ngInject */
    function Controller(ProductsTable, TransfersTable, AppSettings, $http, $rootScope) {
        var vm = this;
        $rootScope.title = 'Market products';
        vm.products = [];
        vm.isTransfering = false;

        vm.takeit = takeit;

        activate();

        function activate() {
            vm.products = ProductsTable.$search({}).$then(function () {
            });
        }

        function takeit(productId) {
            var userId = $rootScope.authenticated.data.id;
            vm.isTransfering = true;
            var transfer = TransfersTable.$create({
                product: productId,
                account: userId,
                target_account: AppSettings.systemId
            }).$then(function () {
                vm.isTransfering = false;
                $http({
                    method: 'GET',
                    url: AppSettings.apiUrl + '/accounts/me/'
                }).then(function (response) {
                    var user = JSON.stringify(response);

                    localStorage.setItem('user', user);

                    $rootScope.authenticated = response;
                });
            }, function () {
                vm.isTransfering = false;
            });
        }
    }
})();
