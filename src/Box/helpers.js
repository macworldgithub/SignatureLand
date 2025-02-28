export const MakeBox = (map) => {

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
};
