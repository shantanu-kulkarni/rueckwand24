import { useCallback } from "react";
import type { Circle } from "../features/image/ImageCanvas";

type Params = {
  circles: Circle[];
  onDrag: (id: string, x: number, y: number) => void;
  setActiveCircleId: (id: string | null) => void;
};

export default function useCircleDrag({
  circles,
  onDrag,
  setActiveCircleId,
}: Params) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      const startX = e.clientX;
      const startY = e.clientY;
      const circle = circles.find((c) => c.id === id);
      if (!circle) return;
      const { x: origX, y: origY } = circle;

      setActiveCircleId(id);

      const onMouseMove = (ev: MouseEvent) => {
        onDrag(id, origX + ev.clientX - startX, origY + ev.clientY - startY);
      };
      const onMouseUp = () => {
        setActiveCircleId(null);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [circles, onDrag, setActiveCircleId]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, id: string) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const circle = circles.find((c) => c.id === id);
      if (!circle) return;
      const { x: origX, y: origY } = circle;

      setActiveCircleId(id);

      const onTouchMove = (ev: TouchEvent) => {
        if (ev.touches.length !== 1) return;
        const t = ev.touches[0];
        onDrag(id, origX + t.clientX - startX, origY + t.clientY - startY);
      };
      const onTouchEnd = () => {
        setActiveCircleId(null);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    },
    [circles, onDrag, setActiveCircleId]
  );

  return { handleMouseDown, handleTouchStart };
}
