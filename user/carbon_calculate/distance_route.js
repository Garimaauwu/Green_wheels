const axios = require('axios');
const HttpError = require('http-error');
const APIKEY = "AIzaSyAP_xIMwJQ4TmG_dgCm_JA2GWqI7xx73Pw";


async function getCoordsfroAdd(address){
    const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&country='India'&key=${APIKEY}`
    );
    console.log(response);
    const data = response.data;
    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('could not find the location of the desired address',422);
        throw error;
    }
    console.log(data.results[0]);
    const coordinates = data.results[0].geometry.location;
    console.log(data.results[0].geometry.location);
    return coordinates; 
}
module.exports = getCoordsfroAdd;