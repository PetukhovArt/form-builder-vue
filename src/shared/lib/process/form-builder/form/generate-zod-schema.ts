import { z } from "zod";
import { FieldConfig } from "@/shared/lib/process/form-builder/field/types";

export function createZodSchema(fields: FieldConfig[]): z.ZodTypeAny {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if ("validation" in field && field.validation) {
      let fieldSchema: z.ZodTypeAny;

      if (field.validation.type === "string") {
        fieldSchema = z.string();
      } else if (field.validation.type === "number") {
        fieldSchema = z.number();
      }

      field.validation.rules.forEach((rule) => {
        if (fieldSchema instanceof z.ZodString) {
          switch (true) {
            case "email" in rule:
              fieldSchema = fieldSchema.email(rule.message);
              break;
            case "url" in rule:
              fieldSchema = fieldSchema.url(rule.message);
              break;
            case "regex" in rule:
              fieldSchema = fieldSchema.regex(rule.regex, rule.message);
              break;
            case "startsWith" in rule:
              fieldSchema = fieldSchema.startsWith(
                rule.startsWith,
                rule.message,
              );
              break;
            case "endsWith" in rule:
              fieldSchema = fieldSchema.endsWith(rule.endsWith, rule.message);
              break;
            case "min" in rule && "max" in rule:
              fieldSchema = fieldSchema
                .min(rule.min, rule.message)
                .max(rule.max, rule.message);
              break;
          }
        } else if (fieldSchema instanceof z.ZodNumber) {
          switch (true) {
            case "min" in rule && "max" in rule:
              fieldSchema = fieldSchema
                .gte(rule.min, rule.message)
                .lte(rule.max, rule.message);
              break;
            case "negative" in rule:
              fieldSchema = fieldSchema.negative(rule.message);
              break;
            case "nonnegative" in rule:
              fieldSchema = fieldSchema.nonnegative(rule.message);
              break;
            case "positive" in rule:
              fieldSchema = fieldSchema.positive(rule.message);
              break;
          }
        }
      });

      //@ts-ignore
      schemaFields[field.name] = fieldSchema;
    }
  });

  return z.object(schemaFields);
}
