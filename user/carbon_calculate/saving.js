const variables = require('../misc-string-data/carbon-calculator-variables')


// Import necessary modules or files
 // Assuming calculateSavings.js contains the savings calculation function

// Define standard default values for parameters
const defaultParams = {
    fuelEfficiency: 10,
    fuelPricePerLiter: 2,
    maintenancePerKm: 0.1,
    parkingAndTollsPerDay: 5,
    publicTransportCostPerDay: 10
};


// Function to calculate the savings by using public transport instead of a private vehicle
async function calculateSavings (distance) {
    // Convert distance from kilometers to miles
    const distanceInMiles = distance / 1.60934;

    // Extract parameters from the object
    const {
        fuelEfficiency,
        fuelPricePerLiter,
        maintenancePerKm,
        parkingAndTollsPerDay,
        publicTransportCostPerDay
    } = params;

    // Calculate the cost of using a private vehicle per day
    const fuelCostPerDay = (distanceInMiles / fuelEfficiency) * (fuelPricePerLiter / 0.264172); // Converting liters to gallons
    const maintenanceCostPerDay = maintenancePerKm * distance;
    const totalPrivateCostPerDay = fuelCostPerDay + maintenanceCostPerDay + parkingAndTollsPerDay;

    // Calculate the savings by using public transportation
    const savingsPerDay = totalPrivateCostPerDay - publicTransportCostPerDay;

    return {
        totalPrivateCostPerDay: totalPrivateCostPerDay.toFixed(2),
        savingsPerDay: savingsPerDay.toFixed(2)
    };
}

module.exports = calculateSavings;