import { z } from "zod";
import { FieldConfig } from "./types";

export function getFieldType(field: unknown, config: FieldConfig): string {
  if (config.type) return config.type;

  if (field instanceof z.ZodString) {
    return "text";
  } else if (field instanceof z.ZodNumber) {
    return "number";
  } else if (field instanceof z.ZodBoolean) {
    return "checkbox";
  } else if (field instanceof z.ZodEnum || field instanceof z.ZodNativeEnum) {
    return config.options ? "select" : "text";
  }

  return "text";
}