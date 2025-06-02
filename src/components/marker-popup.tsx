import { Feature } from "ol";
import { Geometry, Point } from "ol/geom";
import { useRef } from "react";

export interface MarkerPopupProps {
  feature: Feature;
}

const MarkerPopup = ({ feature }: MarkerPopupProps) => {
  const popupRef = useRef(null);
  const geometry = feature.getGeometry();
  const coordinates = (geometry as Point)!.getCoordinates()!;
  return (
    <div
      ref={popupRef}
      className="h-[412px] w-[424px] bg-white rounded-md border border-[#F5F5F5]  shadow-md overflow-auto"
    >
      type: ${geometry?.getType()} coordinates: ${coordinates}
    </div>
  );
};

export default MarkerPopup;
