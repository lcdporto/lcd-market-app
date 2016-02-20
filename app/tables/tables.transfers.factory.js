(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('TransfersTable', function (restmod) {
            return restmod.model('/transfers');
        });
})();