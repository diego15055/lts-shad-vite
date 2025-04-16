import { z } from "zod";
import { ReactNode } from "react";

export type FieldConfig = {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string | number | boolean }[];
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  popover?: ReactNode;
};

export type StepConfig = {
  title?: string;
  description?: string;
  fields: Record<string, FieldConfig>;
};

export type AutoFormProps = {
  schema: z.ZodObject<any>;
  fieldConfig: StepConfig | StepConfig[];
};