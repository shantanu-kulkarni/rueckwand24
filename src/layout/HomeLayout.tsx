import { useState, useCallback, useMemo } from "react";
import ImageCanvas from "../features/image/ImageCanvas";
import type { Circle } from "../features/image/ImageCanvas";
import Sidebar from "../features/sidebar/Sidebar";
import { toast } from "sonner";

const initialMaterials = [
  {
    name: "ALU - Classic Matt",
    image: "/materials/alu-classic-matt.jpg",
    badges: ["Robust & Günstig"],
    details: [],
  },
  {
    name: "ALU Prime - Lotus Seidenmatt",
    image: "/materials/alu-prime-lotus.jpg",
    badges: ["Topseller"],
    details: [],
  },
  {
    name: "ALU Prime - HD Glanz",
    image: "/materials/alu-prime-hd.jpg",
    badges: [],
    details: [],
  },
  {
    name: "ALU Prime - Metall Gebürstet",
    image: "/materials/alu-prime-metal.jpg",
    badges: ["Signature"],
    details: [],
  },
  {
    name: "Acryl - Classic",
    image: "/materials/acryl-classic.jpg",
    badges: [],
    details: [],
  },
];

const CIRCLE_DIAMETER = 24;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;

function isOverlapping(x: number, y: number, circles: Circle[], ignoreId?: string) {
  return circles.some(c => {
    if (ignoreId && c.id === ignoreId) return false;
    const dx = c.x - x;
    const dy = c.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < CIRCLE_DIAMETER;
  });
}

const HomeLayout = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);

  const addCircle = useCallback((x: number, y: number) => {
    if (!imageWidth || !imageHeight) return;
    const clampedX = Math.max(0, Math.min(x, imageWidth));
    const clampedY = Math.max(0, Math.min(y, imageHeight));
    if (isOverlapping(clampedX, clampedY, circles)) {
      toast.error("Cannot add circle: overlaps with another circle.", {
        id: "overlap-error",
        duration: 3000,
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
      return;
    }
    setCircles(prev => [
      ...prev,
      { id: Date.now().toString(), x: clampedX, y: clampedY },
    ]);
  }, [circles, imageWidth, imageHeight]);

  const updateCircle = useCallback((id: string, x: number, y: number) => {
    if (!imageWidth || !imageHeight) return;
    const clampedX = Math.max(0, Math.min(x, imageWidth));
    const clampedY = Math.max(0, Math.min(y, imageHeight));
    if (isOverlapping(clampedX, clampedY, circles, id)) {
      toast.error("Cannot move circle: overlaps with another circle.", {
        id: "overlap-error",
        duration: 3000,
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
      return;
    }
    setCircles(prev => prev.map(c => c.id === id ? { ...c, x: clampedX, y: clampedY } : c));
  }, [circles, imageWidth, imageHeight]);

  const removeCircle = useCallback((id: string) => {
    setCircles(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleImageSizeChange = useCallback((width: number, height: number) => {
    setImageWidth(width);
    setImageHeight(height);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!imageWidth || !imageHeight) return;
    const output = circles.map(c => ({
      x: c.x,
      y: c.y,
      xPercent: (c.x / imageWidth) * 100,
      yPercent: (c.y / imageHeight) * 100,
    }));
    console.log("Submit:", {
      circles: output,
      selectedMaterial,
      imageWidth,
      imageHeight,
    });
    toast.success(
      <div className="text-sm">
        <div className="mb-2 font-semibold text-green-700">Configuration submitted successfully! Here are your details:</div>
        <div className="mb-2 font-semibold text-neutral-700">Material: {selectedMaterial || "None"}</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-neutral-200 rounded-lg">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-2 py-1 font-medium text-left">Circle</th>
                <th className="px-2 py-1 font-medium text-left">X</th>
                <th className="px-2 py-1 font-medium text-left">Y</th>
                <th className="px-2 py-1 font-medium text-left">X%</th>
                <th className="px-2 py-1 font-medium text-left">Y%</th>
              </tr>
            </thead>
            <tbody>
              {output.map((c, i) => (
                <tr key={i} className="even:bg-neutral-50">
                  <td className="px-2 py-1">{i + 1}</td>
                  <td className="px-2 py-1">{c.x}</td>
                  <td className="px-2 py-1">{c.y}</td>
                  <td className="px-2 py-1">{c.xPercent.toFixed(2)}%</td>
                  <td className="px-2 py-1">{c.yPercent.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>,
      { duration: 9000 }
    );
    setCircles([]);
    setSelectedMaterial(null);
  }, [circles, selectedMaterial, imageWidth, imageHeight]);

  const submitDisabled = useMemo(() => circles.length === 0 || !selectedMaterial || !imageWidth || !imageHeight, [circles, selectedMaterial, imageWidth, imageHeight]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fafbfc]">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="mb-8 w-full flex flex-col items-start">
            <h1 className="text-5xl font-bold tracking-tight text-neutral-900 mb-2 text-left">Design your Kitchen Back Wall</h1>
            <p className="text-xl text-neutral-500 font-light text-left max-w-xl">Create your perfect kitchen back wall with custom dimensions, premium materials, and a seamless Apple-inspired experience.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center w-full min-h-[500px]">
            <ImageCanvas
              circles={circles}
              onDrag={updateCircle}
              onRemove={removeCircle}
              onImageSizeChange={handleImageSizeChange}
              circleRadius={CIRCLE_RADIUS}
              setActiveCircleId={setActiveCircleId}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default HomeLayout;
