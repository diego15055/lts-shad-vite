import { Input } from "@/components/ui/input";
import { FieldConfig } from "../../types";

type TextFieldProps = {
  name: string;
  type: string;
  config: FieldConfig;
  field: any;
};

export const TextField = ({ type, config, field }: TextFieldProps) => {
  return <Input type={type} placeholder={config.placeholder} {...field} />;
};