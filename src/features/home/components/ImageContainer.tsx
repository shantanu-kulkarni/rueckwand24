import ImageCanvas from "../image/ImageCanvas";
import type { Circle } from "../image/ImageCanvas";

type Props = {
  circles: Circle[];
  updateCircle: (id: string, x: number, y: number) => void;
  removeCircle: (id: string) => void;
  onImageSizeChange: (width: number, height: number) => void;
  setActiveCircleId: (id: string | null) => void;
};

const CIRCLE_RADIUS = 12;

export default function ImageContainer({
  circles,
  updateCircle,
  removeCircle,
  onImageSizeChange,
  setActiveCircleId,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center w-full min-h-[500px]">
      <ImageCanvas
        circles={circles}
        onDrag={updateCircle}
        onRemove={removeCircle}
        onImageSizeChange={onImageSizeChange}
        circleRadius={CIRCLE_RADIUS}
        setActiveCircleId={setActiveCircleId}
      />
    </div>
  );
}
