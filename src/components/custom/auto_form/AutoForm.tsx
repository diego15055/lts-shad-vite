import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AutoFormProps } from "./types";
import { FormHeader } from "./components/FormHeader";
import { FormNavigation } from "./components/FormNavigation";
import { FormFieldComponent } from "./components/FormField";

export const AutoForm = ({ schema, fieldConfig }: AutoFormProps) => {
  const form = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);

  const isMultiStep = Array.isArray(fieldConfig);
  const steps = isMultiStep ? fieldConfig : [fieldConfig];
  const currentConfig = steps[currentStep];
  const shape = schema._def.shape();

  const currentFields: [string, unknown][] = Object.entries(shape).filter(
    ([name]) => Object.keys(currentConfig.fields).includes(name)
  );

  const nextStep = async () => {
    const currentFieldNames = Object.keys(currentConfig.fields);
    const isValid = await form.trigger(currentFieldNames);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <FormHeader
        isMultiStep={isMultiStep}
        currentStep={currentStep}
        totalSteps={steps.length}
        currentConfig={currentConfig}
        fieldConfig={fieldConfig}
      />

      {currentFields.map(([name, field]) => {
        const config = currentConfig.fields[name] || {};
        return (
          <FormFieldComponent
            key={name}
            name={name}
            field={field}
            config={config}
          />
        );
      })}

      <FormNavigation
        isMultiStep={isMultiStep}
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevStep={prevStep}
        onNextStep={nextStep}
      />
    </div>
  );
};