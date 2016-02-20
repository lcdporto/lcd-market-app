(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthLoginController', Controller);

    /* @ngInject */
    function Controller($rootScope, $state, $auth, $http, AppSettings) {
        var vm = this;
        vm.title = 'Login';
        vm.login = login;

        activate();

        function activate() {}

        function login() {

            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function () {
                return $http({
                    method: 'GET',
                    url: AppSettings.apiUrl + '/accounts/me/'
                });
            }, function (error) {
                console.log(error);
            }).then(function (response) {
                var user = JSON.stringify(response);

                localStorage.setItem('user', user);

                $rootScope.authenticated = response;

                $state.go('market');
            });

        }

    }
})();
