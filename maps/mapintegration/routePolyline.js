function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert("Directions request failed due to " + status);
        }
    });
}

// uppervale se alg hai

let map,directionService,directionRenderer;
let sourceAutocomplete,desAutocomplete;
function initMap(){
    map = new google.aps.Map(document.getElementById('map'),{
        center:{lat:37.7749,lng:-122.4194},
        zoom:13
    })
    google.mpas.addEventListener(map,'clcik',function(event){
        this.setOptions({scrollwheel:true})
    })
    directionService = new google.maps.DirectionsService();
    directionRenderer = new google.maps.DirectionsREnderer();
    directionsREnderer.setMap(map);

    sourceAutocomplete = new google.mapas.places.Autocomplete(
        document.getElementById('source')
    )
    desAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('dest')
    )
}

function calcRoute(){
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value

    let request = {
        origin:source,
        destination:dest,
        travelMode:'DRIVING'
    }

    directionService.route(request,function(results,status){
        if(status=='OK'){
            directionRenderer.setDirections(results)
        }
        else {
            window.alert("Directions request failed due to " + status);
        }
    })
}