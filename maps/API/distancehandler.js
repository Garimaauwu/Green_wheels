const {promisify} = require('util')

exports.distance = (req,res)=>{
    const {source,dest} = ;

let autocomplete1 = new google.maps.places.Autocomplete(source);
let autocomplete2 = new google.maps.places.Autocomplete(dest);

let myLatlng = {
    lat: 38.346,//eska kuch seen krna pdega dehradun ka dalna hai
    lng: -0.4907
};

let mapOptions = {
    center: myLatlng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
//post marna pdega 
directionsDisplay.setMap(map);
// Create a DirectionService object to use the route method and get a result for a route
let directionService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
let directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map

// Define calcRoute function
function calcRoute() {
    let request = {
        origin: source,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Get the distance
            let distance = result.routes[0].legs[0].distance.text;
            console.log('Distance: ', distance);//bhjna pdega aage
            let duration= result.routes[0].legs[0].duration.text;//duration aage bhjna hai
            console.log('Duration: ',duration );
            // Display route
            directionsDisplay.setDirections(result);
        }else {
            // Handle the error
            if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
                alert('No route found. Please check your origin and destination.');
            } else {
                alert('Error fetching directions: ' + status);
            }
        }
    });
}
}





