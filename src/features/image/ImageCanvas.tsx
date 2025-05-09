import { useRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/shadcncomponents/ui/tooltip";

export type Circle = {
  id: string;
  x: number; // center x
  y: number; // center y
};

const imageURL = "src/assets/images/image.jpg"; // update with actual path

type ImageCanvasProps = {
  circles: Circle[];
  onDrag: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
  onImageSizeChange?: (width: number, height: number) => void;
  circleRadius: number;
  setActiveCircleId: (id: string | null) => void;
};

// Utility to generate a random pastel color with 0.75 opacity based on index
function getRandomColor(idx: number) {
  const hue = (idx * 47) % 360;
  return `hsla(${hue}, 70%, 80%, 0.75)`;
}

export default function ImageCanvas({
  circles,
  onDrag,
  onImageSizeChange,
  circleRadius,
  setActiveCircleId,
}: ImageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Report image size to parent
  const reportSize = () => {
    if (imgRef.current && onImageSizeChange) {
      const rect = imgRef.current.getBoundingClientRect();
      onImageSizeChange(rect.width, rect.height);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", reportSize);
    return () => window.removeEventListener("resize", reportSize);
    // eslint-disable-next-line
  }, []);

  function handleMouseDown(e: React.MouseEvent, id: string) {
    const startX = e.clientX;
    const startY = e.clientY;
    const circle = circles.find((c) => c.id === id);
    if (!circle) return;
    const origX = circle.x;
    const origY = circle.y;

    setActiveCircleId(id);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      onDrag(id, origX + dx, origY + dy);
    };

    const onMouseUp = () => {
      setActiveCircleId(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function handleTouchStart(e: React.TouchEvent, id: string) {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const circle = circles.find((c) => c.id === id);
    if (!circle) return;
    const origX = circle.x;
    const origY = circle.y;

    setActiveCircleId(id);

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length !== 1) return;
      const t = moveEvent.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      onDrag(id, origX + dx, origY + dy);
    };

    const onTouchEnd = () => {
      setActiveCircleId(null);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full border border-neutral-200 rounded-xl bg-white overflow-hidden"
    >
      <img
        ref={imgRef}
        src={imageURL}
        className="w-full h-full object-cover select-none pointer-events-none"
        alt="main"
        onLoad={reportSize}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      <TooltipProvider>
        {circles.map((circle, idx) => {
          const xPercent = imgRef.current
            ? (circle.x / imgRef.current.width) * 100
            : 0;
          const yPercent = imgRef.current
            ? (circle.y / imgRef.current.height) * 100
            : 0;

          return (
            <Tooltip key={circle.id}>
              <TooltipTrigger asChild>
                <div
                  onMouseDown={(e) => handleMouseDown(e, circle.id)}
                  onTouchStart={(e) => handleTouchStart(e, circle.id)}
                  className="absolute w-6 h-6 rounded-full border border-white cursor-move hover:scale-110 transition-transform duration-200"
                  style={{
                    top: circle.y - circleRadius,
                    left: circle.x - circleRadius,
                    backgroundColor: getRandomColor(idx),
                  }}
                />
              </TooltipTrigger>
              <TooltipContent
                sideOffset={8}
                className="bg-white backdrop-blur-sm border border-neutral-200 shadow-lg rounded-lg p-2 [&>svg]:hidden"
              >
                <div className="text-xs text-neutral-500 space-y-0.5">
                  <div>
                    X: {Math.floor(circle.x)}px ({Math.round(xPercent)}%)
                  </div>
                  <div>
                    Y: {Math.floor(circle.y)}px ({Math.round(yPercent)}%)
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
