import { Button } from "@/components/ui/button";

type FormNavigationProps = {
  isMultiStep: boolean;
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
};

export const FormNavigation = ({
  isMultiStep,
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
}: FormNavigationProps) => {
  if (isMultiStep) {
    return (
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevStep}
          disabled={currentStep === 0}
        >
          Back
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button type="button" onClick={onNextStep}>
            Next
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-end mt-8">
      <Button type="submit">Submit</Button>
    </div>
  );
};