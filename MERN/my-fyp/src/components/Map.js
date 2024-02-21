import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749, // Latitude of the map center
    lng: -122.4194, // Longitude of the map center
  };

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  return (
    <GoogleMap
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      center={center}
    >
      <Marker
        position={center}
        onClick={() => handleMarkerClick({ name: "PMAS Arid Agricultural University", position: center })}
      />

      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.position}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
