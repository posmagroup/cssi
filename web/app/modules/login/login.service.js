(function () 
{

    'use strict';

    angular.module('cssi.services.login').service('LoginService', ['$q', '$rootScope', 'LoginFactory', LoginService]);

    function LoginService($q, $rootScope, LoginFactory)
    {
        var storage = sessionStorage;

        this.login = login;
        
        function login(user)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            storage.setItem('username', user.username);

            LoginFactory.generateToken(user)
                .then(function ()
                {
                    var username = storage.getItem('username');
                    promise = getUser(username)
                        .then(function()
                        {
                            defered.resolve();
                        })
                        .catch(function()
                        {
                            defered.reject();
                        });
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function getUser(username)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            LoginFactory.getUser(username)
                .then(function (data)
                {
                    storage.setItem('name', data.name);
                    storage.setItem('lastname', data.lastname);
                    storage.setItem('role', data.role);

                    defered.resolve();
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }

})();