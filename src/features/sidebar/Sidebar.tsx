import { Button } from "../../components/shadcncomponents/ui/button";
import { Input } from "../../components/shadcncomponents/ui/input";
import { useState, useCallback, useMemo } from "react";
import type { Circle } from "../image/ImageCanvas";
import { Check, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/shadcncomponents/ui/card";

type Material = {
  name: string;
  image: string;
  badges: string[];
  details: string[];
};

type SidebarProps = {
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

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getRandomColor(idx: number) {
  const hue = (idx * 47) % 360;
  return `hsla(${hue}, 70%, 80%, 0.5)`;
}

export default function Sidebar({
  circles,
  addCircle,
  updateCircle,
  removeCircle,
  selectedMaterial,
  setSelectedMaterial,
  materials,
  onSubmit,
  submitDisabled,
  imageWidth,
  imageHeight,
  circleRadius,
  activeCircleId,
}: SidebarProps) {
  const [newX, setNewX] = useState("");
  const [newY, setNewY] = useState("");

  const handleAddCircle = useCallback(() => {
    if (!newX || !newY || !imageWidth || !imageHeight) return;
    const clampedX = clamp(Number(newX), circleRadius, imageWidth - circleRadius);
    const clampedY = clamp(Number(newY), circleRadius, imageHeight - circleRadius);
    addCircle(clampedX, clampedY);
    setNewX("");
    setNewY("");
  }, [addCircle, newX, newY, imageWidth, imageHeight, circleRadius]);

  const handleXChange = useCallback((circle: Circle, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!imageWidth) return;
    const val = clamp(Number(e.target.value), circleRadius, imageWidth - circleRadius);
    updateCircle(circle.id, val, circle.y);
  }, [updateCircle, imageWidth, circleRadius]);

  const handleYChange = useCallback((circle: Circle, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!imageHeight) return;
    const val = clamp(Number(e.target.value), circleRadius, imageHeight - circleRadius);
    updateCircle(circle.id, circle.x, val);
  }, [updateCircle, imageHeight, circleRadius]);

  const handleXBlur = useCallback((circle: Circle, e: React.FocusEvent<HTMLInputElement>) => {
    if (!imageWidth) return;
    const val = clamp(Number(e.target.value), circleRadius, imageWidth - circleRadius);
    updateCircle(circle.id, val, circle.y);
  }, [updateCircle, imageWidth, circleRadius]);

  const handleYBlur = useCallback((circle: Circle, e: React.FocusEvent<HTMLInputElement>) => {
    if (!imageHeight) return;
    const val = clamp(Number(e.target.value), circleRadius, imageHeight - circleRadius);
    updateCircle(circle.id, circle.x, val);
  }, [updateCircle, imageHeight, circleRadius]);

  const handleNewXBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!imageWidth) return;
    setNewX(String(clamp(Number(e.target.value), circleRadius, imageWidth - circleRadius)));
  }, [imageWidth, circleRadius]);

  const handleNewYBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!imageHeight) return;
    setNewY(String(clamp(Number(e.target.value), circleRadius, imageHeight - circleRadius)));
  }, [imageHeight, circleRadius]);

  const isAddDisabled = useMemo(() => !imageWidth || !imageHeight, [imageWidth, imageHeight]);

  return (
    <div className="flex flex-row h-full">
      <div
        className="flex-1 flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ minHeight: "700px" }}
      >
        <div className="w-full max-w-lg mx-auto">

          {/* Dimensions Section */}
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-left">Enter Dimensions.</h2>
            <p className="text-lg text-neutral-500 font-light text-left mb-6">
              Set the exact positions for your custom points. You can drag or enter values below.
            </p>
            <div className="w-full p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {circles.map((circle, idx) => (
                <Card
                  key={circle.id}
                  className={`flex flex-row items-center gap-2 mb-6 w-full bg-white rounded-xl border transition-all duration-300 px-4 py-3 ${
                    activeCircleId === circle.id
                      ? "border-black shadow-lg scale-[1.02]"
                      : "border-neutral-200 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  <div
                    className="w-5 h-5 flex-shrink-0 rounded-full border border-white mr-4"
                    style={{ backgroundColor: getRandomColor(idx) }}
                  />
                  <div className="flex-1 flex flex-col sm:flex-row gap-2 lg:gap-6 w-full items-center">
                    <div className="flex items-center w-full sm:w-auto">
                      <div className="text-xs text-neutral-500 mr-4">X</div>
                      <Input
                        id={`x-${circle.id}`}
                        type="number"
                        value={circle.x}
                        onChange={e => handleXChange(circle, e)}
                        onBlur={e => handleXBlur(circle, e)}
                        className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-2 transition-all duration-200"
                      />
                    </div>
                    <div className="flex items-center w-full sm:w-auto">
                      <span className="text-xs text-neutral-500 mr-4">Y</span>
                      <Input
                        id={`y-${circle.id}`}
                        type="number"
                        value={circle.y}
                        onChange={e => handleYChange(circle, e)}
                        onBlur={e => handleYBlur(circle, e)}
                        className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-2 transition-all duration-200"
                      />
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        removeCircle(circle.id);
                      }}
                      className="ml-auto text-neutral-400 hover:text-red-500 transition-colors flex items-center justify-center w-8 h-8 rounded-full"
                      title="Delete circle"
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Card>
              ))}

              <Card className="flex flex-row items-center gap-2 mb-6 w-full bg-white rounded-xl shadow-sm px-4 py-3">
                <div className="w-5 h-5 flex-shrink-0 mr-4 flex items-center justify-center" />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full items-center">
                  <div className="flex items-center w-full sm:w-auto">
                    <span className="text-xs text-neutral-500 mr-4">X</span>
                    <Input
                      id="new-x"
                      placeholder="X"
                      type="number"
                      value={newX}
                      onChange={e => setNewX(e.target.value)}
                      onBlur={handleNewXBlur}
                      className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-2 transition-all duration-200"
                      disabled={isAddDisabled}
                    />
                  </div>
                  <div className="flex items-center w-full sm:w-auto">
                    <span className="text-xs text-neutral-500 mr-4">Y</span>
                    <Input
                      id="new-y"
                      placeholder="Y"
                      type="number"
                      value={newY}
                      onChange={e => setNewY(e.target.value)}
                      onBlur={handleNewYBlur}
                      className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg px-4 py-2 transition-all duration-200"
                      disabled={isAddDisabled}
                    />
                  </div>
                  <button
                    onClick={handleAddCircle}
                    disabled={isAddDisabled}
                    className="ml-auto text-neutral-400 hover:text-blue-600 transition-colors flex items-center justify-center w-8 h-8 rounded-full"
                    title="Add circle"
                    type="button"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* Material Section */}
          <div className="h-auto flex flex-col mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-left">Select Material.</h2>
            <p className="text-lg text-neutral-500 font-light text-left mb-6">
              Choose from our premium materials to match your style and needs.
            </p>
            <div className="mt-4 space-y-4 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {materials
                .filter(m => !m.name.trim().toLowerCase().includes("sidebar"))
                .map(material => {
                  const isSelected = material.name === selectedMaterial;
                  return (
                    <button
                      key={material.name}
                      type="button"
                      onClick={() => setSelectedMaterial(isSelected ? null : material.name)}
                      className={`w-full flex flex-col items-start gap-2 rounded-2xl border transition-all duration-200 text-left bg-white
                        ${
                          isSelected
                            ? "border-black shadow-lg scale-[1.02]"
                            : "border-neutral-200 hover:border-neutral-400"
                        }
                        px-3 py-4 relative group`}
                      style={{ minHeight: isSelected ? 120 : 64 }}
                    >
                      <div className="flex-1 w-full">
                        <div className="flex items-center w-full">
                          <span
                            className={`font-semibold max-w-full ${
                              isSelected ? "text-black" : "text-neutral-800 truncate"
                            }`}
                          >
                            {material.name}
                          </span>
                          <div className="flex gap-2 ml-auto">
                            {material.badges.map((badge, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  badge === "Topseller"
                                    ? "bg-red-100 text-red-600"
                                    : badge === "Signature"
                                    ? "bg-black text-white"
                                    : badge === "Robust & Günstig"
                                    ? "bg-blue-100 text-blue-700"
                                    : ""
                                }`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        {isSelected && (
                          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                            {material.details.map((d, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-black">✓</span> {d}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {isSelected && (
                        <span className="absolute bottom-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <Check className="p-1" strokeWidth={4} />
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Submit Section */}
          <div className="min-h-[200px] flex flex-col mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-left">Submit.</h2>
            <p className="text-lg text-neutral-500 font-light text-left mb-6">
              Review your configuration and submit your design.
            </p>
            <Button className="w-full text-lg py-6 rounded-xl" onClick={onSubmit} disabled={submitDisabled}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
