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
    {
        name: "Western Russia",
        latitude: {
            min: 42,
            max: 56
        },
        longitude: {
            min: 35,
            max: 65
        }
    },
    {
        name: "Eastern Russia / Mongolia",
        latitude: {
            min: 43,
            max: 54
        },
        longitude: {
            min: 79,
            max: 114,
        }
    },
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

export {
    coordinateSelections
};