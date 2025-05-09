import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import type { Circle } from "@/features/image/ImageCanvas";

const DIAMETER = 24;

function isOverlapping(
  x: number,
  y: number,
  circles: Circle[],
  ignoreId?: string
) {
  return circles.some((c) => {
    if (ignoreId && c.id === ignoreId) return false;
    const dx = c.x - x;
    const dy = c.y - y;
    return Math.sqrt(dx * dx + dy * dy) < DIAMETER;
  });
}

export default function useCircles() {
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
        toast.error("Cannot add circle: overlaps with another circle.");
        return;
      }
      setCircles((prev) => [
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
        toast.error("Cannot move circle: overlaps with another circle.");
        return;
      }
      setCircles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, x: clampedX, y: clampedY } : c))
      );
    },
    [circles, imageWidth, imageHeight]
  );

  const removeCircle = useCallback((id: string) => {
    setCircles((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleImageSizeChange = useCallback((width: number, height: number) => {
    setImageWidth(width);
    setImageHeight(height);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!imageWidth || !imageHeight) return;
    const output = circles.map((c) => ({
      x: c.x,
      y: c.y,
      xPercent: (c.x / imageWidth) * 100,
      yPercent: (c.y / imageHeight) * 100,
    }));
    toast.success("Configuration submitted successfully.");
    console.log({ circles: output, selectedMaterial, imageWidth, imageHeight });
    setCircles([]);
    setSelectedMaterial(null);
  }, [circles, selectedMaterial, imageWidth, imageHeight]);

  const submitDisabled = useMemo(
    () =>
      circles.length === 0 || !selectedMaterial || !imageWidth || !imageHeight,
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
  };
}
