import { StepConfig } from "../types";

type FormHeaderProps = {
  isMultiStep: boolean;
  currentStep: number;
  totalSteps: number;
  currentConfig: StepConfig;
  fieldConfig: StepConfig | StepConfig[];
};

export const FormHeader = ({
  isMultiStep,
  currentStep,
  totalSteps,
  currentConfig,
  fieldConfig,
}: FormHeaderProps) => {
  if (isMultiStep) {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentConfig.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        {currentConfig.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {currentConfig.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <span className="text-md">{(fieldConfig as StepConfig).title}</span>
      {(fieldConfig as StepConfig).description && (
        <p className="text-sm text-muted-foreground mt-2">
          {(fieldConfig as StepConfig).description}
        </p>
      )}
    </>
  );
};