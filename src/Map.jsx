import React, { useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import { Searchbar } from "./Search";
import { WeatherCard } from "./WeatherCard";
mapboxgl.accessToken ="pk.eyJ1Ijoia2luZ3Jpdjk4IiwiYSI6ImNsdDBkNDh5ZjB3amEyaW53MTZ4Z3d0bDIifQ.-3ym1_SfVbmLxWQCDgbobg"

export const Map = () =>{
   
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(15);
  const [lng, setLng] = useState(30);
  const [zoom, setZoom] = useState(1);

  // object containing searched name and coordinates 
  const [searchedLocation , setSearchedLocation] = useState()
  
  function moveToCoordinates(location) {
    // Move the map to the searched location's coordinates

    map.current.panTo([location.coordinates[0], location.coordinates[1]], {duration: 3000})
     
    //wait for animation to complete
    setTimeout(()=>{
      map.current.zoomTo(10.5, {
        duration: 2000  
    })
    }, 3000)


    setSearchedLocation(location)
   
  }


  useEffect(() => {
    // initialize map only once
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      style:"mapbox://styles/kingriv98/clt1qaar800x101qs6k3p2x4n"
    });

    map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        console.log('A move event occurred.')
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      }); 

      map.current.on('style.load', () => {
        map.current.setFog({
          "color": 'rgb(186, 210, 235)',
           "range": [0.5,10],
          'high-color': "hsl(239, 29%, 67%)",// Upper atmosphere
          'horizon-blend': ["interpolate",["exponential",0.5],["zoom"], 3.5, 0.01, 5,0.1], // Atmosphere thickness (default 0.2 at low zooms)
          'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
        });
      });

     
   
      // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 240;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.current.getCenter();
            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }

    // Pause spinning on interaction
    map.current.on('mousedown', () => {
        userInteracting = true;
    });
    map.current.on('dragstart', () => {
        userInteracting = true;
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.current.on('moveend', () => {
        spinGlobe();
    });

    spinGlobe();
    

  });

  return (
    <div> 
       <Searchbar moveToCoordinates={moveToCoordinates}/>
        <div ref={mapContainer} className="map-container" />
        <div className="sidebar">
          Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}
        </div>

        {searchedLocation? 
        <WeatherCard location={searchedLocation}/>
      : null }
    </div>
    );
}