import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldConfig } from "../../types";

type SelectFieldProps = {
  name: string;
  config: FieldConfig;
  field: any;
};

export const SelectField = ({ name, config, field }: SelectFieldProps) => {
  const form = useFormContext();
  const currentValue = form.watch(name);
  const showOtherField = currentValue === "other";

  return (
    <div className="space-y-2">
      <Select
        onValueChange={(value) => {
          field.onChange(value);
          if (value !== "other") {
            form.setValue(`${name}_others`, "");
          }
        }}
        value={field.value}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={config.placeholder || "Select an option"}
          />
        </SelectTrigger>
        <SelectContent>
          {config.options?.map((option) => (
            <SelectItem
              key={String(option.value)}
              value={String(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showOtherField && (
        <FormField
          control={form.control}
          name={`${name}_others`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Please specify" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};