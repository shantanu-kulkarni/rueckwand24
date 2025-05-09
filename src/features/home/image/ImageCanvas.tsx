import { useRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcncomponents/ui/tooltip";
import useCircleDrag from "@/hooks/useCircleDrag";
import { getRandomColor } from "@/utility/getRandomColor";

export type Circle = {
  id: string;
  x: number;
  y: number;
};

const imageURL = "/images/image.jpg";

type Props = {
  circles: Circle[];
  onDrag: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
  onImageSizeChange?: (width: number, height: number) => void;
  circleRadius: number;
  setActiveCircleId: (id: string | null) => void;
};

export default function ImageCanvas({
  circles,
  onDrag,
  onImageSizeChange,
  circleRadius,
  setActiveCircleId,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { handleMouseDown, handleTouchStart } = useCircleDrag({
    circles,
    onDrag,
    setActiveCircleId,
  });

  useEffect(() => {
    const reportSize = () => {
      if (imgRef.current && onImageSizeChange) {
        const rect = imgRef.current.getBoundingClientRect();
        onImageSizeChange(rect.width, rect.height);
      }
    };
    window.addEventListener("resize", reportSize);
    return () => window.removeEventListener("resize", reportSize);
  }, [onImageSizeChange]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full border border-neutral-200 rounded-xl bg-white overflow-hidden"
    >
      <img
        ref={imgRef}
        src={imageURL}
        alt="main"
        className="w-full h-full object-cover select-none pointer-events-none"
        onLoad={() => {
          if (imgRef.current && onImageSizeChange) {
            const rect = imgRef.current.getBoundingClientRect();
            onImageSizeChange(rect.width, rect.height);
          }
        }}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      <TooltipProvider>
        {circles.map((circle, idx) => {
          const xPct = imgRef.current
            ? (circle.x / imgRef.current.width) * 100
            : 0;
          const yPct = imgRef.current
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
                className="bg-white backdrop-blur-sm border border-neutral-200 shadow-lg rounded-lg p-2"
              >
                <div className="text-xs text-neutral-500 space-y-0.5">
                  <div>
                    X: {Math.floor(circle.x)}px ({Math.round(xPct)}%)
                  </div>
                  <div>
                    Y: {Math.floor(circle.y)}px ({Math.round(yPct)}%)
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
