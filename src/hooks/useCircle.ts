import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import type { Circle } from "@/features/home/image/ImageCanvas";

const CIRCLE_DIAMETER = 24;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;

function isOverlapping(x: number, y: number, circles: Circle[], ignoreId?: string) {
  return circles.some(c => {
    if (ignoreId && c.id === ignoreId) return false;
    const dx = c.x - x;
    const dy = c.y - y;
    return Math.sqrt(dx * dx + dy * dy) < CIRCLE_DIAMETER;
  });
}

type UseCirclesProps = {
  showSuccessToast: (data: {
    circles: Circle[];
    imageWidth: number;
    imageHeight: number;
    selectedMaterial: string | null;
  }) => void;
};

export default function useCircles({ showSuccessToast }: UseCirclesProps) {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);

  const addCircle = useCallback(
    (x: number, y: number) => {
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
    },
    [circles, imageWidth, imageHeight]
  );

  const updateCircle = useCallback(
    (id: string, x: number, y: number) => {
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

      setCircles(prev =>
        prev.map(c => (c.id === id ? { ...c, x: clampedX, y: clampedY } : c))
      );
    },
    [circles, imageWidth, imageHeight]
  );

  const removeCircle = useCallback((id: string) => {
    setCircles(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleImageSizeChange = useCallback((width: number, height: number) => {
    setImageWidth(width);
    setImageHeight(height);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!imageWidth || !imageHeight) return;
    showSuccessToast({
      circles,
      imageWidth,
      imageHeight,
      selectedMaterial,
    });
    setCircles([]);
    setSelectedMaterial(null);
  }, [circles, imageWidth, imageHeight, selectedMaterial, showSuccessToast]);

  const submitDisabled = useMemo(
    () =>
      circles.length === 0 ||
      !selectedMaterial ||
      !imageWidth ||
      !imageHeight,
    [circles, selectedMaterial, imageWidth, imageHeight]
  );

  return {
    circles,
    selectedMaterial,
    imageWidth,
    imageHeight,
    activeCircleId,
    setActiveCircleId,
    addCircle,
    updateCircle,
    removeCircle,
    setSelectedMaterial,
    handleImageSizeChange,
    handleSubmit,
    submitDisabled,
    CIRCLE_RADIUS,
  };
}
