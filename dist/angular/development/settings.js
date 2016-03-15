(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('AppSettings', {
            appName: 'LCD Site Projects',
            appVersion: 0.1,
            apiUrl: 'http://api.market.audienciazero.net',
            systemId: 4
        });
})();