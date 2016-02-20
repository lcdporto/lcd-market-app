(function () {
    'use strict';

    angular
        .module('app', [
            'ngMaterial',
            'ui.router',
            'ngResource',
            'satellizer',
            'infinite-scroll',
            'app.core',
            'app.accounts',
            'app.auth',
            'app.market',
            'app.tables',
            'ngFileUpload',
            'ngImgCrop',
            'restmod',
            'restmod.styles.drfPaged'
        ])
        .config(function ($urlRouterProvider,
                          $mdThemingProvider,
                          $resourceProvider,
                          $mdIconProvider,
                          $authProvider,
                          $provide,
                          $httpProvider,
                          AppSettings,
                          restmodProvider) {

            restmodProvider.rebase({
                $config: {
                    urlPrefix: AppSettings.apiUrl
                }
            });
            restmodProvider.rebase('DjangoDRFPagedApi');

            $resourceProvider.defaults.stripTrailingSlashes = false;

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('amber');

            $authProvider.loginUrl = AppSettings.apiUrl + '/api-token-auth/';
            $urlRouterProvider.otherwise('/auth');

            function redirectWhenLoggedOut($q, $injector) {
                return {

                    responseError: function (rejection) {
                        var $state = $injector.get('$state');
                        // the string the api returns when a request has been made without
                        // passing the credentials, in this case email and password
                        var msg = 'Authentication credentials were not provided.';
                        if (rejection.data.detail === msg && $state.current.name !== 'auth') {
                            localStorage.removeItem('user');
                            $state.go('auth');
                        }

                        return $q.reject(rejection);
                    }
                };
            }

            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
            $httpProvider.interceptors.push('redirectWhenLoggedOut');

            // setup icon provider
            // we can register icon and/or iconsets
            // see https://material.angularjs.org/latest/api/service/$mdIconProvider
            // where to find and download icons https://design.google.com/icons/
            $mdIconProvider
                .icon('inbox', 'content/icons/ic_inbox_white_48px.svg', 48)
                .icon('search', 'content/icons/ic_search_black_48px.svg', 48);
            angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250);
        })
        .run(function ($rootScope, $state) {

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                var user = localStorage.getItem('user');
                if (user !== 'undefined' && user !== null) {
                    user = JSON.parse(user);
                    $rootScope.authenticated = user;
                    if (toState.name === 'auth') {
                        event.preventDefault();
                        $state.go('market');
                    }
                }
            });
        });
})();
