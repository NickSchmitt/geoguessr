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
    // {
    //     name: "West Africa",
    //     latitude: {
    //         min: 2,
    //         max: 19
    //     },
    //     longitude: {
    //         min: -27,
    //         max: 10
    //     }
    // },
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

let map;
let panorama;

function initMap() {
    const randomLocation = getRandomCoordinates(coordinateSelections);
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
        zoom: 2,
        streetViewControl: false,
    });
    // Set the initial Street View camera to the center of the map  
    sv.getPanorama({
        location: randomLocation,
        radius: 1000000,
        preference: "nearest",
        source: "outdoor",
    }, processSVData);

}

function processSVData(data, status) {
    if (status === "OK") {
        const location = data.location;
        // random coord obj
        svLocation = {
            lat: data.location.latLng.lat(),
            lng: data.location.latLng.lng()
        };
        panorama.setPano(location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0,
        });
        panorama.setVisible(true);
        map.addListener("click", (e) => {
            // click coord obj
            let clickLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            };
            // marker at random coord obj
            const svMarker = new google.maps.Marker({
                position: svLocation,
                map,
                title: location.description,
            });
            // marker at click coord obj
            const clickMarker = new google.maps.Marker({
                position: clickLocation,
                map,
                title: location.description,
            });
            // calc dist between random coord and click coord
            console.log(getDistanceFromLatLng(clickLocation.lat, clickLocation.lng, svLocation.lat, svLocation.lng));
        });
    } else {

        console.error("Street View data not found for this location.");
    }
}

function getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
    if (typeof miles === "undefined") {
        miles = false;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function square(x) {
        return Math.pow(x, 2);
    }
    var r = 6371; // radius of the earth in km
    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);
    var lat_dif = lat2 - lat1;
    var lng_dif = deg2rad(lng2 - lng1);
    var a = square(Math.sin(lat_dif / 2)) + Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
    var d = 2 * r * Math.asin(Math.sqrt(a));
    if (miles) {
        return d * 0.621371;
    } //return miles
    else {
        return d;
    } //return km
}