import { useState } from "react";
import { useMapEvents } from "react-leaflet";

type Location = {
  latitude: number;
  longitude: number;
};
const useLocation = () => {
  const [newLocation, setNewLocation] = useState<Location>({
    longitude: -38.9683,
    latitude: -12.2614,
  });

  // Captura coordenadas clicadas
  function LocationSelector() {
    useMapEvents({
      click(e: any) {
        setNewLocation((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });
    return null;
  }
  return {
    newLocation,
    setNewLocation,
    LocationSelector,
  };
};

export default useLocation;
