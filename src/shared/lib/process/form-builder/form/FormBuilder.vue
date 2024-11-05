<script lang="ts" setup>
import {
  FormConfig,
  FormValue,
} from "@/shared/lib/process/form-builder/form/types";
import Field from "@/shared/lib/process/form-builder/field/Field.vue";
import { FieldValue } from "@/shared/lib/process/form-builder/field/types";
import { createZodSchema } from "@/shared/lib/process/form-builder/form/generate-zod-schema";
import { z } from "zod";

type Emits = {
  (e: "onSubmit", value: FormValue): void;
  (e: "onCancel"): void;
};
const emit = defineEmits<Emits>();
type Props = {
  formConfig: FormConfig;
  defaultValue: FormValue;
  resetOnSubmit?: boolean;
};
const { formConfig, defaultValue, resetOnSubmit = true } = defineProps<Props>();

const formState = ref<Partial<FormValue>>({});

const getFieldValue = (name: string) => {
  return formState.value[name] ?? defaultValue?.[name];
};
const handleChangeField = (name: string, value: FieldValue) => {
  formState.value[name] = value;
};
const onReset = () => {
  formState.value = {};
  formErrors.value = {};
  emit("onCancel");
};
const onSubmit = (e: any) => {
  e?.preventDefault();

  validate();

  if (Object.keys(formErrors.value).length) {
    return;
  }
  // схлапываем дефолтные и измененные, подходит только для плоской формы
  emit("onSubmit", Object.assign({}, defaultValue, formState.value));
  if (resetOnSubmit) {
    formState.value = {};
  }
};
let schema: z.ZodTypeAny;
const formErrors = ref<Record<string, string>>({});

const validate = () => {
  if (!schema) return;
  try {
    schema.parse(Object.assign({}, defaultValue, formState.value));
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        formErrors.value[err.path[0]] = err.message;
      });
    }
  }
  console.log(formErrors);
};

onMounted(() => {
  schema = createZodSchema(formConfig.fields);
});
</script>

<template>
  <form>
    <div>
      <Field
        v-for="(field, index) in formConfig.fields"
        :key="index"
        :config="field"
        :value="getFieldValue(field.name)"
        @handleChange="handleChangeField"
        :error="formErrors[field.name]"
      />
    </div>

    <div>
      <v-btn type="submit" @click="onSubmit">Сохранить</v-btn>
      <v-btn type="button" @click="onReset">Отмена</v-btn>
    </div>
  </form>
</template>

<style scoped></style>
