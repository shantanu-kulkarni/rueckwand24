import { Check } from "lucide-react";
import type { Material } from "@/features/sidebar/Sidebar";

type Props = {
  materials: Material[];
  selectedMaterial: string | null;
  setSelectedMaterial: (material: string | null) => void;
};

export default function MaterialSelector({
  materials,
  selectedMaterial,
  setSelectedMaterial,
}: Props) {
  return (
    <div className="mt-4 space-y-4 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {materials
        .filter((m) => !m.name.toLowerCase().includes("sidebar"))
        .map((material) => {
          const isSelected = material.name === selectedMaterial;
          return (
            <button
              key={material.name}
              type="button"
              onClick={() =>
                setSelectedMaterial(isSelected ? null : material.name)
              }
              className={`w-full flex flex-col items-start gap-2 rounded-2xl border text-left bg-white
                transition-all duration-200
                ${
                  isSelected
                    ? "border-black shadow-lg scale-[1.02]"
                    : "border-neutral-200 hover:border-neutral-400 hover:shadow-md hover:scale-[1.01]"
                }
                px-3 py-4 relative group`}
              style={{ minHeight: isSelected ? 120 : 64 }}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center w-full">
                  <span
                    className={`font-semibold ${
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
                            : badge === "Robust & Cheap"
                            ? "bg-blue-100 text-blue-500"
                            : ""
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                {isSelected && material.details.length > 0 && (
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
  );
}
