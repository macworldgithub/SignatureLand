import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox token here
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lnbmF0dXJlbGFuZHMiLCJhIjoiY200d2J6Y29jMGQwczJxc2Y3MzBmeDhpZCJ9.CLBIlBACiro2UT8Cabo1OQ";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [67.0011, 24.8607],
      zoom: 14,
      pitch: 45,
      bearing: -17.6,
    });

    map.on("load", () => {
      const buildings = [];
      const startLat = 24.86;
      const startLng = 67.001;
      const rowSpacing = 0.0003; // Spacing for rows
      const colSpacing = 0.0004; // Spacing for columns
      const gap = 0.0001;

      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 2; col++) {
          const lat = startLat + row * (rowSpacing + gap);
          const lng = startLng + col * (colSpacing + gap);
          buildings.push({
            type: "Feature",
            properties: { height: 10, min_height: 0 },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [lng, lat],
                  [lng + colSpacing, lat],
                  [lng + colSpacing, lat + rowSpacing],
                  [lng, lat + rowSpacing],
                  [lng, lat],
                ],
              ],
            },
          });
        }
      }

      map.addSource("custom-buildings", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: buildings,
        },
      });

      map.addLayer({
        id: "custom-buildings",
        source: "custom-buildings",
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-color": "#ff0000", // Red buildings
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.8,
        },
      });

      setMap(map);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;
