import { Checkbox } from "@/components/ui/checkbox";
import { FieldConfig } from "../../types";

type CheckboxFieldProps = {
  name: string;
  config: FieldConfig;
  field: any;
};

export const CheckboxField = ({ name, config, field }: CheckboxFieldProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={!!field.value}
        onCheckedChange={field.onChange}
        id={name}
      />
      {config.label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {config.label}
        </label>
      )}
    </div>
  );
};