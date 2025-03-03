// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import b from "./building.geojson"

// mapboxgl.accessToken = "pk.eyJ1Ijoic2lnbmF0dXJlbGFuZHMiLCJhIjoiY200d2J6Y29jMGQwczJxc2Y3MzBmeDhpZCJ9.CLBIlBACiro2UT8Cabo1OQ" // Replace with your actual Mapbox token

// const MapComponent = () => {
//   const mapContainerRef = useRef(null);



//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [74.421881, 31.686624], // Center map
//       zoom: 10
//     });


    
//     map.on("load", () => {
//       // Load the GeoJSON data
//       map.addSource("polygons", {
//         type: "geojson",
//         data: b // Replace with your actual file path
//       });
    
//       // Add a fill layer for polygons (if any)
//       map.addLayer({
//         id: "polygon-fill",
//         type: "fill",
//         source: "polygons",
//         paint: {
//           "fill-color": ["case", ["has", "color"], ["get", "color"], "#ffcc00"], // Default yellow
//           "fill-opacity": 0.6
//         }
//       });
    
//       // Add borders to the polygons
//       map.addLayer({
//         id: "polygon-borders",
//         type: "line",
//         source: "polygons",
//         paint: {
//           "line-color": "#000",
//           "line-width": 2
//         }
//       });
    
//       // Add labels for names
//       map.addLayer({
//         id: "polygon-name-labels",
//         type: "symbol",
//         source: "polygons",
//         layout: {
//           "text-field": [
//             "case",
//             ["has", "address"], 
//             ["concat", ["get", "name"], " - ", ["get", "address"]], // Show name + address if address exists
//             ["get", "name"] // Show only name if address is missing
//           ],
//           "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
//           "text-size": 14,
//           "text-anchor": "center"
//         },
//         paint: {
//           "text-color": "#000",
//           "text-halo-color": "#fff",
//           "text-halo-width": 2
//         }
//       });
//     });
    
//     return () => map.remove();
//   }, []);

//   return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />;
// };

// export default MapComponent;
import React, { useEffect, useRef } from "react"; // ✅ Corrected Imports
import mapboxgl from "mapbox-gl";
import b from "./building.geojson";

mapboxgl.accessToken = "pk.eyJ1Ijoic2lnbmF0dXJlbGFuZHMiLCJhIjoiY200d2J6Y29jMGQwczJxc2Y3MzBmeDhpZCJ9.CLBIlBACiro2UT8Cabo1OQ"; // Replace with actual token

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [74.201203, 31.45097], // 📍 Park View Villas
      zoom: 16,
      attributionControl: false // 🚀 Footer Removed
    });

    map.on("load", () => {
      // ✅ Fly to Park View Villas
      const parkViewVillasCoordinates = [74.201203, 31.45097];

      setTimeout(() => {
        map.flyTo({
          center: parkViewVillasCoordinates,
          zoom: 16,
          speed: 1.2,
          curve: 1.4,
          essential: true
        });
      }, 2000);

      // Load the GeoJSON data
      map.addSource("polygons", {
        type: "geojson",
        data: b
      });

      // Add a fill layer for polygons
      map.addLayer({
        id: "polygon-fill",
        type: "fill",
        source: "polygons",
        paint: {
          "fill-color": ["case", ["has", "color"], ["get", "color"], "#ffcc00"],
          "fill-opacity": 0.6
        }
      });

      // Add borders to the polygons
      map.addLayer({
        id: "polygon-borders",
        type: "line",
        source: "polygons",
        paint: {
          "line-color": "#000",
          "line-width": 2
        }
      });

      // Add labels for names
      map.addLayer({
        id: "polygon-name-labels",
        type: "symbol",
        source: "polygons",
        layout: {
          "text-field": [
            "case",
            ["has", "address"], 
            ["concat", ["get", "name"], " - ", ["get", "address"]], 
            ["get", "name"]
          ],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 14,
          "text-anchor": "center"
        },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 2
        }
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" }} />;
};

export default MapComponent;