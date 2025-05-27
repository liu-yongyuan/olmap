import React from "react";
import MapComponent from "./components/map";

export default function App() {
  return (
     <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">OpenLayers + ol-ext Demo</h1>
      <MapComponent />
    </div>
  );
}
