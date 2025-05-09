import { Button } from "@/components/shadcncomponents/ui/button";

type Props = {
  onSubmit: () => void;
  submitDisabled?: boolean;
};

export default function SubmitSection({ onSubmit, submitDisabled }: Props) {
  return (
    <div className="min-h-[150px] mb-12">
      <Button
        className="w-full text-lg py-6 rounded-xl"
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </div>
  );
}
