(function ()
{

    'use strict';

    angular.module('cssi.controllers.doctor').controller('DoctorCtrl', ['$state', '$stateParams', 'DoctorService', DoctorCtrl]);

    function DoctorCtrl($state, $stateParams, DoctorService)
    {
        var self = this;
        self.doctorList = self.specialtyList = self.statusList = [];
        self.doctor = 
        {
            name: null,
            lastname: null,
            specialty: null
        };
        self.doctorId;


        self.getDoctorList = function ()
        {
            DoctorService.getAll()
                .then(function (data)
                {
                    self.doctorList = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }


        self.addDoctor = function (doctor)
        {
            if(DoctorService.validate(doctor))
            {
                DoctorService.add(doctor)
                    .then(function (data)
                    {
                        $state.go('menu.doctor');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }


        self.getParameter = function (updateView)
        {
            var urlParameter = $stateParams.doctorId;

            if(urlParameter)
            {
                DoctorService.get(urlParameter)
                    .then(function (data)
                    {
                        self.doctor = data;

                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.doctor');
            }
        }


        self.updateDoctor = function (doctor)
        {
            var urlParameter = $stateParams.doctorId;

            if(urlParameter && DoctorService.validate(doctor))
            {
                DoctorService.update(doctor)
                    .then(function ()
                    {
                        $state.go('menu.doctor');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }


        self.loadSpecialities = function()
        {
            DoctorService.getSpecialities()
                .then(function(data)
                {
                    self.specialtyList = data;
                })
                .catch(function()
                {
                    console.log('Fallo al cargar especialidades');
                });
        }


        self.loadStatus = function()
        {
            DoctorService.getStatus()
                .then(function (data)
                {
                    self.statusList = data;
                })
                .catch(function (e)
                {
                    console.log('Fallo al cargar estados');
                });
        }




    }

})();