'use-strict';

const utils = require('../utils/utils');

test('correct random numbers generated', () => {
    expect(utils.random(0, 100)).toBeGreaterThan(0);
    expect(utils.random(0, 100)).toBeLessThan(100);
});
test('valid car data', () => {
    expect(utils.isValidCar({ 
        name: 'Valid car', 
        vin: 'DASOUYOP', 
        make: 'Renault', 
        model: 'Clio', 
        year: '2016', 
        fuelType: 'petrol', 
        type: 'budget', 
        odometer: 12546
    })).toBeTruthy();
    
    expect(utils.isValidCar({ 
        name: 'Valid car', 
        vin: 'DASOUYOP', 
        make: 'Renault', 
        model: 'Clio', 
        year: null, 
        fuelType: 'petrol', 
        type: 'budget', 
        odometer: 12546
    })).toBeTruthy();
    
    expect(utils.isValidCar({ 
        name: null, 
        vin: 'DASOUYOP', 
        make: 'Renault', 
        model: 'Clio', 
        year: '2016', 
        fuelType: 'petrol', 
        type: 'budget', 
        odometer: 12546
    })).toBeFalsy();
    
    expect(utils.isValidCar({ 
        name: 'Unvalid car', 
        vin: null, 
        make: 'Renault', 
        model: 'Clio', 
        year: '2016', 
        fuelType: 'petrol', 
        type: 'budget', 
        odometer: 12546
    })).toBeFalsy();
});