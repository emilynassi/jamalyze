
var mapbox = "https://api.mapbox.com/styles/v1/suvithala/cjeyil7ri1fbr2so59e01iq3w/tiles/256/{z}/{x}/{y}?" +
              "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ";

var myMap = L.map("map", {
 		center: [37.09, -95.71],
 	 	zoom: 5,
});

L.tileLayer(mapbox).addTo(myMap);

function getIcon(genre){
    if(genre =="Rock"){
    	console.log(genre);
        return 'static/images/green.png';

    }
    else if(genre == "Pop"){
        return 'static/images/blue.png';
    }
    else if(genre == "Metal"){
        return 'static/images/red.png';
    }
    else if(genre =="Hip-Hop/Rap"){
        return 'static/images/orange.png';
    }
    else if(genre =="Dance/Electronic"){
        return 'static/images/pink.png';
    }
    else if(genre =="Country"){
        return 'static/images/purple.png';
    }
}

Plotly.d3.json("/maps", function (error, response) {
	if (error) return console.warn(error); 
	console.log(response);

	for (var i = 0; i < response.length; i++) {
		var greenIcon = L.icon({
		    iconUrl: getIcon(response[i].Genre),
		    iconSize:     [25, 25], // size of the icon
		    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
		    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		})
		L.marker([response[i].Latitude, response[i].Longitude], {icon: greenIcon})
			.bindPopup("<h3><strong>" + response[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + response[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + response[i].Genre + "/" + response[i].Subgenre +"<strong></h4>")
    		.addTo(myMap);
	}
});
