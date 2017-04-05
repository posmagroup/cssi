(function ()
{
    'use strict';

    angular.module('cssi.factories.doctor').factory('DoctorFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', DoctorFactory]);

    function DoctorFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.DOCTOR;
        var request = $resource(url, { },
            {
                'query':  {method:'GET', isArray:true},
                'update': {method: 'PUT'}
            },{
                stripTrailingSlashes: false
            });


        var factory =
        {
            getAll: getAllDoctors,
            get: getDoctor,
            update: updateDoctor,
            add: addDoctor
        };

        return factory;

        function getAllDoctors()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.query(null,
            function success(data)
            {
                defered.resolve(data);
            },
            function error(e)
            {
                defered.reject();
            });

            return promise;
        }

        function getDoctor(doctorId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({doctorId: doctorId},
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });
            //TODO: tratar datos

            return promise;
        }

        function updateDoctor()
        {

        }

        function addDoctor()
        {

        }
    }

})();
