import {
  FieldConfig,
  FieldValue,
} from "@/shared/lib/process/form-builder/field/types";

export type FormConfig = {
  fields: FieldConfig[];
};
export type FormValue = Record<string, FieldValue | undefined>;
