(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('AccountsTable', function (restmod) {
            return restmod.model('/accounts');
        });
})();