// src/components/Map.jsx
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Fill, RegularShape } from "ol/style";
import { Circle, LineString, Point, Polygon } from "ol/geom";
import Feature from "ol/Feature";
import { fromExtent } from "ol/geom/Polygon";
import Transform from "ol-ext/interaction/Transform";
import ModifyFeature from "ol-ext/interaction/ModifyFeature";
import { shiftKeyOnly } from "ol/events/condition";
import { MapBrowserEvent, Overlay } from "ol";
import * as Extent from "ol/extent";
import MarkerPopup from "./marker-popup";

const useModify = (map: Map, source: VectorSource) => {
  const modify = new ModifyFeature({
    source,
  });
  map.addInteraction(modify);
};

const useTransform = (map: Map, vectorLayer: VectorLayer) => {
  // ol-ext Transform
  const transform = new Transform({
    layers: [vectorLayer],
    enableRotatedTransform: false,
    addCondition: shiftKeyOnly,
    hitTolerance: 2,
    translateFeature: false,
    scale: true,
    rotate: true,
    keepAspectRatio: undefined,
    keepRectangle: false,
    translate: true,
    stretch: true,
    // Get scale on points
    pointRadius: function (f) {
      var radius = f.get("radius") || 10;
      return [radius, radius];
    },
  });

  map.addInteraction(transform);
};

const initData = () => {
  // Style
  const getStyle = (feature: any) => {
    return [
      new Style({
        image: new RegularShape({
          fill: new Fill({ color: [0, 0, 255, 0.4] }),
          stroke: new Stroke({ color: [0, 0, 255, 1], width: 1 }),
          radius: feature.get("radius") || 10,
          points: 3,
          angle: feature.get("angle") || 0,
        }),
        fill: new Fill({ color: [0, 0, 255, 0.4] }),
        stroke: new Stroke({ color: [0, 0, 255, 1], width: 1 }),
      }),
    ];
  };

  const vectorSource = new VectorSource({
    features: [
      new Feature(
        new Polygon([
          [
            [34243, 6305749],
            [-288626, 5757848],
            [210354, 5576845],
            [300000, 6000000],
            [34243, 6305749],
          ],
        ])
      ),
      new Feature(
        new LineString([
          [406033, 5664901],
          [689767, 5718712],
          [699551, 6149206],
          [425601, 6183449],
        ])
      ),
      new Feature(new Point([269914, 6248592])),
      new Feature(new Circle([500000, 6400000], 100000)),
    ],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: getStyle,
  });

  return vectorLayer;
};

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const vectorLayer = initData();
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

    // useTransform(map, vectorLayer);
    useModify(map, vectorLayer.getSource()!);

    setMap(map);

    return () => map.setTarget(undefined);
  }, []);

  const createReactOverlayer = () => {
    map!.on("singleclick", (evt) => {
      const feature = map!.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        const container = document.createElement("div");

        const popup = new Overlay({
          element: container,
          autoPan: true,
        });
        const geometry = feature.getGeometry();
        popup.setPosition(Extent.getCenter(geometry!.getExtent()));
        map!.addOverlay(popup);

        const root = ReactDOM.createRoot(container);
        root.render(<MarkerPopup feature={feature as Feature} />);
      }
    });
  };

  return (
    <>
      <div
        ref={mapRef}
        className="w-full h-[600px] border border-gray-300 rounded-md shadow"
      />
    </>
  );
};

export default MapComponent;
