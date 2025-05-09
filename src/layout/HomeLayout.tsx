import HeroHeader from "@/features/home/components/HeroHeader";
import ImageContainer from "@/features/home/components/ImageContainer";
import SidebarPanel from "@/features/home/components/SidebarPanel";
import type { Circle } from "@/features/home/image/ImageCanvas";
import useCircles from "@/hooks/useCircle";
import { toast } from "sonner";
export default function HomeLayout() {
  const showSuccessToast = (data: {
    circles: Circle[];
    imageWidth: number;
    imageHeight: number;
    selectedMaterial: string | null;
  }) => {
    const { circles, imageWidth, imageHeight, selectedMaterial } = data;

    const output = circles.map((c) => ({
      ...c,
      xPercent: (c.x / imageWidth) * 100,
      yPercent: (c.y / imageHeight) * 100,
    }));

    toast.success(
      <div className="text-sm">
        <div className="mb-4 font-semibold text-black">
          Configuration submitted successfully! Here are your details:
        </div>
        <div className="mb-4 font-semibold text-neutral-700">
          Material: {selectedMaterial || "None"}
        </div>
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
  };
  const {
    circles,
    imageWidth,
    imageHeight,
    selectedMaterial,
    activeCircleId,
    setActiveCircleId,
    addCircle,
    updateCircle,
    removeCircle,
    setSelectedMaterial,
    handleImageSizeChange,
    handleSubmit,
    submitDisabled,
  } = useCircles({ showSuccessToast });
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fafbfc]">
      <div className="w-full xl:w-5/6 mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-4 sm:p-8">
          <HeroHeader />
          <ImageContainer
            circles={circles}
            updateCircle={updateCircle}
            removeCircle={removeCircle}
            onImageSizeChange={handleImageSizeChange}
            setActiveCircleId={setActiveCircleId}
          />
        </div>
        <SidebarPanel
          circles={circles}
          addCircle={addCircle}
          updateCircle={updateCircle}
          removeCircle={removeCircle}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          handleSubmit={handleSubmit}
          submitDisabled={submitDisabled}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          activeCircleId={activeCircleId}
        />
      </div>
    </div>
  );
}
