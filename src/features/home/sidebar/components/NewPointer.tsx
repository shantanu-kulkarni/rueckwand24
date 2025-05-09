import { Plus } from "lucide-react";
import { Input } from "@/components/shadcncomponents/ui/input";
import { Card } from "@/components/shadcncomponents/ui/card";
import { clamp } from "@/utility/sidebarClamp";

type Props = {
  newX: string;
  newY: string;
  setNewX: (val: string) => void;
  setNewY: (val: string) => void;
  addCircle: (x: number, y: number) => void;
  imageWidth?: number | null;
  imageHeight?: number | null;
  circleRadius: number;
  isAddDisabled: boolean;
};

export default function NewCircleInput({
  newX,
  newY,
  setNewX,
  setNewY,
  addCircle,
  imageWidth,
  imageHeight,
  circleRadius,
  isAddDisabled,
}: Props) {
  const handleAdd = () => {
    if (!newX || !newY || !imageWidth || !imageHeight) return;
    const x = clamp(Number(newX), circleRadius, imageWidth - circleRadius);
    const y = clamp(Number(newY), circleRadius, imageHeight - circleRadius);
    addCircle(x, y);
    setNewX("");
    setNewY("");
  };

  return (
    <Card className="flex flex-row items-center gap-2 mb-6 w-full bg-white rounded-xl border border-neutral-200 shadow-sm px-4 py-3 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
      <div className="w-5 h-5 flex-shrink-0 mr-4 flex items-center justify-center" />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full items-center">
        <LabeledInput
          label="X"
          value={newX}
          setValue={setNewX}
          disabled={isAddDisabled}
        />
        <LabeledInput
          label="Y"
          value={newY}
          setValue={setNewY}
          disabled={isAddDisabled}
        />
        <button
          onClick={handleAdd}
          disabled={isAddDisabled}
          className="ml-auto text-neutral-400 hover:text-blue-600 transition-colors flex items-center justify-center w-8 h-8 rounded-full"
          title="Add circle"
          type="button"
        >
          <Plus size={18} />
        </button>
      </div>
    </Card>
  );
}

function LabeledInput({
  label,
  value,
  setValue,
  disabled,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center w-full sm:w-auto">
      <span className="text-xs text-neutral-500 mr-4">{label}</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 text-lg px-4 py-2"
        disabled={disabled}
      />
    </div>
  );
}
