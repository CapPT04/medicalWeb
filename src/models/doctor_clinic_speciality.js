'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Doctor_Clinic_Speciality extends Model {
        static associate(models) {
            // define association here
        }
    };

    Doctor_Clinic_Speciality.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialityId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Clinic_Speciality',
    });

    return Doctor_Clinic_Speciality;
};