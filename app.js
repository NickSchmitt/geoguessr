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
    // {
    //     name: "Middle East",
    //     latitude: {
    //         min: 14,
    //         max: 38
    //     },
    //     longitude: {
    //         min: 29,
    //         max: 55
    //     }
    // },
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

];


let getRandomCoordinates = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let obj = arr[randomIndex];
    let randomLat = (Math.random() * (obj.latitude.max - obj.latitude.min) + obj.latitude.min).toFixed(5) * 1;
    let randomLong = (Math.random() * (obj.longitude.max - obj.longitude.min) + obj.longitude.min).toFixed(5) * 1;
    let randomCoord = {
        lat: randomLat,
        lng: randomLong
    };
    return randomCoord;
};

let map;
let panorama;
let x = 10000000;
let counter = 0;
let clickMarker;
let distancePath;
let sv;
let infowindow;


// *** MIN/MAX UI ***
let mapSize = "mid";
document.querySelector("#maximize").addEventListener("click", () => {
    let mapFrame = document.querySelector("#map-frame");
    if (mapSize == "mid") {
        mapFrame.style.height = "70%";
        mapFrame.style.width = "70%";
        mapSize = "max";
        document.querySelector("#maximize").disabled = false;

    } else if (mapSize == "min") {
        mapFrame.style.height = "40%";
        mapFrame.style.width = "40%";
        mapSize = "mid";
        document.querySelector("#guess").style.display = "block";
        document.querySelector("#play-again").style.display = "block";
        document.querySelector("#minimize").disabled = false;

    }
});
document.querySelector("#minimize").addEventListener("click", () => {
    let mapFrame = document.querySelector("#map-frame");
    if (mapSize == "mid") {
        mapFrame.style.height = "15%";
        mapFrame.style.width = "15%";
        mapSize = "min";
        document.querySelector("#guess").style.display = "none";
        document.querySelector("#play-again").style.display = "none";

        document.querySelector("#minimize").disabled = true;
    } else if (mapSize == "max") {
        mapFrame.style.height = "40%";
        mapFrame.style.width = "40%";
        mapSize = "mid";
    }
});

function startGame(x) {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano")
    );
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2,
        streetViewControl: false,
        mapId: 'fd1a1dc518ebfbc1',
        fullscreenControl: false,
        disableDefaultUI: true,
    });
    clickMarker = new google.maps.Marker()
    svMarker = new google.maps.Marker()
    distancePath = new google.maps.Polyline()
    infowindow = new google.maps.InfoWindow({
        disableAutoPan: true
    })
    initMap(x);
}


// ***INIT MAP ***
function initMap(x, sv) {
    sv = new google.maps.StreetViewService();
    let randomLocation = getRandomCoordinates(coordinateSelections);
    sv.getPanorama({
        location: randomLocation,
        radius: x,
        preference: "nearest",
        source: "outdoor",
    }, processSVData);

}

// *** CALLBACK ***
function processSVData(data, status) {
    if (status === "OK") {
        let location = data.location;
        panorama.setPano(location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0,
        });
        panorama.setVisible(true);
        panorama.setOptions({
            addressControl: false,
            fullscreenControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },


        });
        // *** CLICK MAP LISTENER ***
        map.addListener("click", (e) => {
            let clickLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            };
            let svLocation = {
                lat: data.location.latLng.lat(),
                lng: data.location.latLng.lng()
            };
            clickMarker.setPosition(clickLocation)
            clickMarker.setMap(map)
            document.querySelector("#guess").disabled = false;
            // *** CLICK GUESS LISTENER ***
            document.querySelector("#guess").addEventListener("click", () => {
                svMarker.setPosition(svLocation)
                svMarker.setMap(map)
                let distance = haversine(clickLocation.lat, clickLocation.lng, svLocation.lat, svLocation.lng);
                endGame(distance);
                let contentString = `Your guess was ${distance.toFixed(2)}km away.`;
                infowindow.setContent(contentString)
                infowindow.open(map, svMarker);
                infowindow.setPosition(svLocation);
                distancePath.setMap(map);
                distancePath.setPath([clickLocation, svLocation])
                fartypoo = findBounds(clickLocation, svLocation)
                map.fitBounds(fartypoo)
                document.querySelector("#play-again").style.display = "block";
                document.querySelector("#guess").style.display = "none";
                // *** *** PLAY AGAIN *** *** //
                document.querySelector("#play-again").addEventListener("click", () => {
                    reset(distancePath, svMarker, clickMarker);
                    initMap(x);
                });
            });
        });
    } else {
        counter++;
        if (counter == 3) {
            console.error("Street View data not found for this location.");

        } else {
            initMap(x * 2);
        }

    }
}

// ***HAVERSINE
function haversine(lat1, lng1, lat2, lng2, miles) { // miles optional
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

let endGame = (distance) => {
    // document.querySelector("#map-frame").style.height = "80%";
    // document.querySelector("#map-frame").style.width = "100%";
    // document.querySelector("#map-frame").style.bottom = "100";
    // document.querySelector("#map-frame").style.top = "0";
    // document.querySelector("#pano").style.display = "none";
    // document.querySelector(".ui").style.display = "none";
    document.querySelector("#play-again").style.display = "block";
    document.querySelector("#guess").style.display = "none";
    document.querySelector("#winner-text").innerText = `Your guess was ${distance.toFixed(2)}km away.`;
};

// *** RESET / PLAY AGAIN
let reset = (distancePath, svMarker, clickMarker) => {
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#guess").style.display = "block";
    document.querySelector("#winner-text").innerText = "";
    svMarker.setPosition(null);
    clickMarker.setPosition(null);
    distancePath.setPath([]);
    infowindow.setMap(null)
    map.setZoom(2)


}

let findBounds = (clickLocation, svLocation) => {
    let latArr = [clickLocation.lat, svLocation.lat]
    latArrSorted = latArr.sort((a, b) => a - b)
    let lngArr = [clickLocation.lng, svLocation.lng]
    lngArrSorted = lngArr.sort((a, b) => a - b);
    boundsLiteral = {
        south: latArrSorted[0],
        west: lngArrSorted[0],
        north: latArrSorted[1],
        east: latArrSorted[1],
    }
    console.log(boundsLiteral)

    return boundsLiteral
}