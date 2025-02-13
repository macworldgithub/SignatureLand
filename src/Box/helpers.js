export const MakeBox = (map) => {
  //   return map.addSource("custom-buildings", {
  //     type: "geojson",
  //     data: {
  //       type: "FeatureCollection",
  //       features: [
  //         {
  //           type: "Feature",
  //           properties: {
  //             height: 10,
  //             min_height: 0,
  //           },
  //           geometry: {
  //             type: "Polygon",
  //             coordinates: [
  //               [
  //                 [67.0011, 24.8607],
  //                 [67.0021, 24.8607],
  //                 [67.0021, 24.8617],
  //                 [67.0011, 24.8617],
  //                 [67.0011, 24.8607],
  //               ],
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   });

  //   Add a layer for custom buildings
  return map.addLayer({
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

  //   // Add a black boundary around the buildings
  //   map.addLayer({
  //     id: "building-border",
  //     source: "custom-buildings",
  //     type: "line",
  //     paint: {
  //       "line-color": "#000000", // Black border color
  //       "line-width": 2, // Border width
  //     },
  //   });
};
