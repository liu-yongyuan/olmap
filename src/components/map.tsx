// src/components/Map.jsx
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Fill } from "ol/style";
import { Polygon } from "ol/geom";
import Feature from "ol/Feature";
import { fromExtent } from "ol/geom/Polygon";
import Transform from "ol-ext/interaction/Transform";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 矢量图层
    const rect = fromExtent([0, 0, 500000, 500000]);
    const feature = new Feature(rect);

    feature.setStyle(
      new Style({
        stroke: new Stroke({ color: "red", width: 2 }),
        fill: new Fill({ color: "rgba(255, 0, 0, 0.1)" }),
      })
    );

    const vectorSource = new VectorSource({ features: [feature] });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // 地图实例
    const map = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // ol-ext Transform
    const transform = new Transform({
      layers: [vectorLayer],
      enableRotatedTransform: true,
      addCondition: () => true,
    });

    map.addInteraction(transform);

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[600px] border border-gray-300 rounded-md shadow"
    />
  );
};

export default MapComponent;
