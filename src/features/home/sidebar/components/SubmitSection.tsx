import { Button } from "@/components/shadcncomponents/ui/button";

type Props = {
  onSubmit: () => void;
  submitDisabled?: boolean;
};

export default function SubmitSection({ onSubmit, submitDisabled }: Props) {
  return (
    <div className=" mb-16">
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
