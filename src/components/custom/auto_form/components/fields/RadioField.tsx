import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FieldConfig } from "../../types";

type RadioFieldProps = {
  name: string;
  config: FieldConfig;
  field: any;
};

export const RadioField = ({ name, config, field }: RadioFieldProps) => {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      value={field.value}
      className="flex flex-col space-y-1"
    >
      {config.options?.map((option) => (
        <div
          key={String(option.value)}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            value={String(option.value)}
            id={`${name}-${option.value}`}
          />
          <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};