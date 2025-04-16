import { Textarea } from "@/components/ui/textarea";
import { FieldConfig } from "../../types";

type TextareaFieldProps = {
  name: string;
  config: FieldConfig;
  field: any;
};

export const TextareaField = ({ config, field }: TextareaFieldProps) => {
  return <Textarea placeholder={config.placeholder} {...field} />;
};