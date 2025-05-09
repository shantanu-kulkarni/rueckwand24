import { Input } from "@/components/shadcncomponents/ui/input";
import { Card } from "@/components/shadcncomponents/ui/card";
import { Trash2 } from "lucide-react";
import type { Circle } from "../../image/ImageCanvas";
import { clamp } from "@/utility/sidebarClamp";
import { getRandomColor } from "@/utility/getRandomColor";

type Props = {
  circles: Circle[];
  updateCircle: (id: string, x: number, y: number) => void;
  removeCircle: (id: string) => void;
  imageWidth?: number | null;
  imageHeight?: number | null;
  circleRadius: number;
  activeCircleId: string | null;
};

export default function CircleList({
  circles,
  updateCircle,
  removeCircle,
  imageWidth,
  imageHeight,
  circleRadius,
  activeCircleId,
}: Props) {
  return (
    <div className="w-full px-4">
      {circles.map((circle, idx) => (
        <Card
          key={circle.id}
          className={`flex flex-row items-center gap-2 mb-6 w-full bg-white rounded-xl border px-4 py-3 transition-all duration-300 ${
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
            <LabeledInput
              label="X"
              value={circle.x}
              onChange={(val) =>
                imageWidth &&
                updateCircle(
                  circle.id,
                  clamp(val, circleRadius, imageWidth - circleRadius),
                  circle.y
                )
              }
            />
            <LabeledInput
              label="Y"
              value={circle.y}
              onChange={(val) =>
                imageHeight &&
                updateCircle(
                  circle.id,
                  circle.x,
                  clamp(val, circleRadius, imageHeight - circleRadius)
                )
              }
            />
            <button
              onClick={() => removeCircle(circle.id)}
              className="ml-auto text-neutral-400 hover:text-red-500 transition-colors flex items-center justify-center w-8 h-8 rounded-full"
              title="Delete circle"
              type="button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center w-full sm:w-auto">
      <div className="text-xs text-neutral-500 mr-4">{label}</div>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 text-lg px-4 py-2"
      />
    </div>
  );
}
