/*
 * Click the map to set a new location for the Street View camera.
 */

let coordinateSelections = [{
        name: "North America",
        latitude: {
            min: 11,
            max: 54
        },
        longitude: {
            min: -135,
            max: -54
        }
    },
    {
        name: "Central America",
        latitude: {
            min: 10,
            max: 30
        },
        longitude: {
            min: -121,
            max: -78
        }
    },
    {
        name: "South America",
        latitude: {
            min: -56,
            max: 11
        },
        longitude: {
            min: -83,
            max: -31
        }
    },
    {
        name: "Southern Africa",
        latitude: {
            min: -35,
            max: -10,
        },
        longitude: {
            min: 12,
            max: 50,
        }
    },
    {
        name: "West Africa",
        latitude: {
            min: 2,
            max: 19
        },
        longitude: {
            min: -27,
            max: 10
        }
    },
    {
        name: "Northern Europe",
        latitude: {
            min: 57,
            max: 72
        },
        longitude: {
            min: -29,
            max: 34,
        }
    },
    {
        name: "Western Europe",
        latitude: {
            min: 30,
            max: 57,
        },
        longitude: {
            min: -12,
            max: 19,
        }
    },
    {
        name: "Central Europe",
        latitude: {
            min: 36,
            max: 54
        },
        longitude: {
            min: 14,
            max: 39
        }
    },
    // {
    //     name: "Western Russia",
    //     latitude: {
    //         min: 42,
    //         max: 56
    //     },
    //     longitude: {
    //         min: 35,
    //         max: 65
    //     }
    // },
    // {
    //     name: "Eastern Russia / Mongolia",
    //     latitude: {
    //         min: 43,
    //         max: 54
    //     },
    //     longitude: {
    //         min: 79,
    //         max: 114,
    //     }
    // },
    {
        name: "Middle East",
        latitude: {
            min: 14,
            max: 38
        },
        longitude: {
            min: 29,
            max: 55
        }
    },
    {
        name: "South Asia",
        latitude: {
            min: 3,
            max: 35
        },
        longitude: {
            min: 69,
            max: 91
        }
    },
    {
        name: "South East Asia",
        latitude: {
            min: -11,
            max: 29
        },
        longitude: {
            min: 86,
            max: 126
        }
    },
    {
        name: "East Asia",
        latitude: {
            min: 19,
            max: 53,
        },
        longitude: {
            min: 116,
            max: 146
        }
    },
    {
        name: "Oceania",
        latitude: {
            min: -12,
            max: -50,
        },
        longitude: {
            min: 107,
            max: 180
        }
    },

]


function getRandomCoordinates(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let obj = arr[randomIndex];
    let randomLat = (Math.random() * (obj.latitude.max - obj.latitude.min) + obj.latitude.min).toFixed(5) * 1;
    let randomLong = (Math.random() * (obj.longitude.max - obj.longitude.min) + obj.longitude.min).toFixed(5) * 1;
    let randomCoord = {
        lat: randomLat,
        lng: randomLong
    };
    return randomCoord;
}

console.log(getRandomCoordinates(coordinateSelections));

let map;
let panorama;

//  *** do a metadata request to see if the random coordinates are within 100km of a google street view panorama.


// const Http = new XMLHttpRequest();
// const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${randomCoordinates}&key=AIzaSyCBj7T8CMAzR8xOL2Rfewv-NFLP-F1JCYs`;
// Http.open("GET", url);
// Http.send();

// Http.onreadystatechange = (e) => {
//     console.log(randomCoordinates);
//     console.log(Http.responseText);
// };



function initMap() {
    const berkeley = getRandomCoordinates(coordinateSelections);
    const sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano")
    );
    // Set up the map.
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1,
        streetViewControl: false,
    });
    let coverageLayer = new google.maps.StreetViewCoverageLayer();
    coverageLayer.setMap(map);
    // Set the initial Street View camera to the center of the map
    sv.getPanorama({
        location: berkeley,
        radius: 1000000,
        preference: "nearest",
        source: "outdoor",
    }, processSVData);
    // map.addEventListener('click', function(mapsMouseEvent){

    // })
    // add an click event listener, when map is clicked, get the location.
}

function processSVData(data, status) {
    if (status === "OK") {
        const location = data.location;
        const marker = new google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
        });
        panorama.setPano(location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0,
        });
        panorama.setVisible(true);
        marker.addListener("click", () => {
            const markerPanoID = location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
                heading: 270,
                pitch: 0,
            });
            panorama.setVisible(true);
        });

    } else {

        console.error("Street View data not found for this location.");
    }
}

// let coverageLayer = new google.maps.StreetViewCoverageLayer();
// coverageLayer.setMap(map);