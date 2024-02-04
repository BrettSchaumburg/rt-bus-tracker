mapboxgl.accessToken = ''

var map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/mapbox/light-v10',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-71.104,42.365],
    zoom: 13
});

map.addControl(new mapboxgl.NavigationControl());

async function run(){
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	update(locations);
	//timer
	setTimeout(run, 15000);
    
};

async function getBusLocations(){
    currentMarkers.forEach((oneMarker) => oneMarker.remove())
    currentMarkers = [];
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json = await response.json();
	return json.data;
}
var currentMarkers = [];

async function update(){
    const locations = await getBusLocations();
   

     for (let i=0; i<locations.length; i++){
        const long = locations[i].attributes.longitude;
        const lat = locations[i].attributes.latitude;
        console.log(long, lat);
        locations.forEach(element => {

            const elementItem = document.createElement('div');
            elementItem.className = 'bus-marker';
           
            new mapboxgl.Marker(elementItem)
                .setLngLat([long, lat])
                .addTo(map);
                currentMarkers.push(elementItem)
        });
    }
    const HU = document.createElement('div');
        HU.className = 'Harvard';
        new mapboxgl.Marker(HU)
            .setLngLat([-71.1167, 42.3770])
            .addTo(map);
    
    const MIT = document.createElement('div');
        MIT.className = 'MITU';
        new mapboxgl.Marker(MIT)
            .setLngLat([-71.0942, 42.3601])
            .addTo(map);
}
run();
