// src/components/Map.jsx
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
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
import { shiftKeyOnly } from "ol/events/condition";
import { MapBrowserEvent, Overlay } from "ol";
import * as Extent from "ol/extent";

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

const MapComponent = () => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
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

    const popup = new Overlay({
      element: popupRef.current!,
      autoPan: true,
    });
    map.addOverlay(popup);

    map.on("singleclick", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        const geometry = feature.getGeometry();
        const coordinates = (geometry as Point)!.getCoordinates()!;
        popup.setPosition(Extent.getCenter(geometry!.getExtent()));
        popup.getElement()!.innerHTML = `type: ${geometry?.getType()} coordinates: ${coordinates}`;
        popup.getElement()!.style.display = "block";
      }
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        className="w-full h-[600px] border border-gray-300 rounded-md shadow"
      />
      <div
        ref={popupRef}
        className="h-[200px] w-[300px] bg-slate-400 border border-gray-50 rounded-md shadow-md overflow-auto"
      >
      </div>
    </>
  );
};

export default MapComponent;
