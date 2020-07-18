'use-strict';

module.exports.random = (min, max) => {
    return Math.random() * (max - min) + min;
}

module.exports.isValidCar = (car) => {
    return car.name != null && car.vin != null;
}