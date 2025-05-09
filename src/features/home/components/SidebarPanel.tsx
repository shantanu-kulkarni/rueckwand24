import Sidebar from "../sidebar/Sidebar";
import type { Circle } from "../image/ImageCanvas";
import { initialMaterials } from "@/utility/materials";

type Props = {
  circles: Circle[];
  addCircle: (x: number, y: number) => void;
  updateCircle: (id: string, x: number, y: number) => void;
  removeCircle: (id: string) => void;
  selectedMaterial: string | null;
  setSelectedMaterial: (material: string | null) => void;
  handleSubmit: () => void;
  submitDisabled: boolean;
  imageWidth: number | null;
  imageHeight: number | null;
  activeCircleId: string | null;
};

const CIRCLE_RADIUS = 12;

export default function SidebarPanel({
  circles,
  addCircle,
  updateCircle,
  removeCircle,
  selectedMaterial,
  setSelectedMaterial,
  handleSubmit,
  submitDisabled,
  imageWidth,
  imageHeight,
  activeCircleId,
}: Props) {
  return (
    <aside className="w-full lg:w-[420px] xl:w-[480px] h-auto lg:h-screen overflow-y-auto flex flex-col bg-white border-l border-neutral-200 p-4 sm:p-8">
      <Sidebar
        circles={circles}
        addCircle={addCircle}
        updateCircle={updateCircle}
        removeCircle={removeCircle}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        updateCircleMaterial={() => {}}
        materials={initialMaterials}
        onSubmit={handleSubmit}
        submitDisabled={submitDisabled}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        circleRadius={CIRCLE_RADIUS}
        activeCircleId={activeCircleId}
      />
    </aside>
  );
}
