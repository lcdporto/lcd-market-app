(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('ProductsTable', function (restmod) {
            return restmod.model('/products');/*.mix({
            })*/
        });
})();