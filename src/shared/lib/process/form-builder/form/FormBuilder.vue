<script lang="ts" setup>
import {
  FormConfig,
  FormValue,
} from "@/shared/lib/process/form-builder/form/types";
import Field from "@/shared/lib/process/form-builder/field/Field.vue";
import { FieldValue } from "@/shared/lib/process/form-builder/field/types";

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
  emit("onCancel");
};
const onSubmit = (e: any) => {
  e?.preventDefault();
  emit("onSubmit", Object.assign({}, defaultValue, formState.value));
  if (resetOnSubmit) {
    formState.value = {};
  }
};
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
      />
    </div>

    <div>
      <v-btn type="submit" @click="onSubmit">Сохранить</v-btn>
      <v-btn type="button" @click="onReset">Отмена</v-btn>
    </div>
  </form>
</template>

<style scoped></style>
