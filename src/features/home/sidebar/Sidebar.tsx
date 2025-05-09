import { useState, useMemo } from "react";
import type { Circle } from "../image/ImageCanvas";
import SidebarHeader from "./components/SidebarHeader";
import CircleList from "./components/PointerList";
import NewCircleInput from "./components/NewPointer";
import MaterialSelector from "./components/MaterialSelection";
import SubmitSection from "./components/SubmitSection";

export type Material = {
  name: string;
  image: string;
  badges: string[];
  details: string[];
};

type Props = {
  circles: Circle[];
  addCircle: (x: number, y: number) => void;
  updateCircle: (id: string, x: number, y: number) => void;
  removeCircle: (id: string) => void;
  selectedMaterial: string | null;
  setSelectedMaterial: (material: string | null) => void;
  updateCircleMaterial: (id: string, material: string) => void;
  materials: Material[];
  onSubmit: () => void;
  submitDisabled?: boolean;
  imageWidth?: number | null;
  imageHeight?: number | null;
  circleRadius: number;
  activeCircleId: string | null;
};

export default function Sidebar(props: Props) {
  const [newX, setNewX] = useState("");
  const [newY, setNewY] = useState("");

  const isAddDisabled = useMemo(
    () => !props.imageWidth || !props.imageHeight,
    [props.imageWidth, props.imageHeight]
  );

  return (
    <div className="flex flex-row h-full">
      <div
        className="flex-1 flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ minHeight: "700px" }}
      >
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-32">
            <SidebarHeader
              title="Enter Dimensions."
              description="Set the exact positions for your custom points. You can drag or enter values below."
            />
            <CircleList {...props} />
            <div className="px-4">
              <NewCircleInput
                newX={newX}
                newY={newY}
                setNewX={setNewX}
                setNewY={setNewY}
                addCircle={props.addCircle}
                imageWidth={props.imageWidth}
                imageHeight={props.imageHeight}
                circleRadius={props.circleRadius}
                isAddDisabled={isAddDisabled}
              />
            </div>
          </div>

          <div className="mb-32">
            <SidebarHeader
              title="Select Material."
              description="Choose from our premium materials to match your style and needs."
            />
            <MaterialSelector
              materials={props.materials}
              selectedMaterial={props.selectedMaterial}
              setSelectedMaterial={props.setSelectedMaterial}
            />
          </div>

          <div className="">
            <SidebarHeader
              title="Submit."
              description="Review your configuration and submit your design."
            />
            <SubmitSection
              onSubmit={props.onSubmit}
              submitDisabled={props.submitDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
