import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle
} from "react-google-maps";


const MapWithAMarker = (props) => {
    const { position } = props;
    return <GoogleMap
        defaultZoom={14}
        center={position}
        options={mapOptions} >
        <Circle
            center={position}
            radius={900}
        />
    </GoogleMap>
};


const MapWithPosition = Wrap => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                title: '',
                position: {
                    lat: 0,
                    lng: 0
                }
            }
        }


        componentDidMount() {
            this.geocodeLocation();
        }

        geocodeLocation = () => {
            const { location } = this.props;
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({address: location}, (res, status) => {
                if(status === 'OK') {
                    const title = res[0].formatted_address;
                    const location = res[0].geometry.location;
                    const position = {
                        lat: location.lat(),
                        lng: location.lng()

                    };

                    this.setState({
                        position,
                        title
                    })
                }
            })


        };


        render() {
            return <Wrap {...this.state} />
        }
    }
};


const mapOptions = {
    disableDefaultUI: true,
    styles: [
        {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#2c2e33"
                },
                {
                    "saturation": 7
                },
                {
                    "lightness": 19
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": 31
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": 31
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#bbc0c4"
                },
                {
                    "saturation": -93
                },
                {
                    "lightness": -2
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#e9ebed"
                },
                {
                    "saturation": -90
                },
                {
                    "lightness": -8
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#e9ebed"
                },
                {
                    "saturation": 10
                },
                {
                    "lightness": 69
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#e9ebed"
                },
                {
                    "saturation": -78
                },
                {
                    "lightness": 67
                },
                {
                    "visibility": "simplified"
                }
            ]
        }
    ]
};

export default withScriptjs(withGoogleMap(MapWithPosition(MapWithAMarker)));
