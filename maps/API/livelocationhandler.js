
const distance = require('../API/distancehandler')

exports.watchId = async (req,res)=>{
    await setInterval(navigator.geolocation.watchPosition(position=>{
        const{accuracy,latitude,longitude,altitude,heading,speed} = position.coords;
        
    }),3000);
}
//return krega live location


