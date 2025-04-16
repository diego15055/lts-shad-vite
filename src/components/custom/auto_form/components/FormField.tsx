import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { FieldConfig } from "../types";
import { getFieldType } from "../utils";
import {
  TextField,
  TextareaField,
  CheckboxField,
  RadioField,
  SelectField,
} from "./fields";

type FormFieldProps = {
  name: string;
  field: unknown;
  config: FieldConfig;
};

export const FormFieldComponent = ({ name, field, config }: FormFieldProps) => {
  const form = useFormContext();
  const fieldType = getFieldType(field, config);

  const renderField = (formField: any) => {
    switch (fieldType) {
      case "select":
        return <SelectField name={name} config={config} field={formField} />;
      case "textarea":
        return <TextareaField name={name} config={config} field={formField} />;
      case "checkbox":
        return <CheckboxField name={name} config={config} field={formField} />;
      case "radio":
        return <RadioField name={name} config={config} field={formField} />;
      default:
        return (
          <TextField
            name={name}
            type={fieldType}
            config={config}
            field={formField}
          />
        );
    }
  };

  return (
    <UIFormField
      control={form.control}
      name={name}
      render={({ field: formField }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel>{config.label || name}</FormLabel>

            {config.popover && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full p-0 text-muted-foreground"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Info</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">{config.popover}</PopoverContent>
              </Popover>
            )}
          </div>

          <FormControl>{renderField(formField)}</FormControl>

          {config.description && (
            <FormDescription>{config.description}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};