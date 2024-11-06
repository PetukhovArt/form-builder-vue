<script lang="ts" setup>
import TextField from "@/shared/lib/process/form-builder/field/variants/TextField.vue";
import {
  FieldConfig,
  FieldProps,
} from "@/shared/lib/process/form-builder/field/types";
import ArrayTextField from "@/shared/lib/process/form-builder/field/variants/ArrayTextField.vue";

const props = defineProps<FieldProps<FieldConfig>>();
const emit = defineEmits<{
  (e: "handleChange", name: string, value: string): void;
}>();

function getFieldComponent(type: string) {
  switch (type) {
    case "text":
    case "password":
      return TextField;
    case "array":
      return ArrayTextField;
    case "select":
      return TextField;
    case "multiSelect":
      return TextField;
    case "multiSelectSearch":
      return TextField;
    case "serverSelect":
      return TextField;
    case "checkBoxItem":
      return TextField;
    case "time":
      return TextField;
    case "calendar":
      return TextField;
    default:
      throw new Error(`Unsupported field type: ${props.config.type}`);
  }
}
</script>

<template>
  <component
    :is="getFieldComponent(props.config.type)"
    :config="props.config"
    :value="props.value"
    @handleChange="emit('handleChange', props.config.name, $event)"
    :error="props.error"
  />
</template>
