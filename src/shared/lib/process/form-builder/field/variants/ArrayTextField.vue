<script lang="ts" setup>
import {
  ArrayFieldConfig,
  FieldProps,
  FieldValue,
} from "@/shared/lib/process/form-builder/field/types";
import Field from "@/shared/lib/process/form-builder/field/Field.vue";

const props = defineProps<FieldProps<ArrayFieldConfig>>();
const emit = defineEmits<{
  (e: "handleChange", name: string, value: string): void;
}>();

const onChange = (val: string) => {
  emit("handleChange", val);
};

const handleAddItem = () => {
  const newItem = props.config?.newItemDefault ?? {};
  emit("handleChange", [...parseValue(props.value), newItem]);
};

const parseValue = (value: FieldValue): unknown[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
};
</script>

<template>
  <div v-if="parseValue(props.value).length" class="flex gap-2">
    <div v-for="item in parseValue(props.value)">
      <Field
        v-for="field in config.fields"
        :config="field"
        :value="getFieldValue(field.name)"
        @handleChange="emit('handleChange', props.config.name, $event)"
      />
    </div>
    <v-btn density="compact" icon="mdi-delete"></v-btn>
    <v-btn density="compact" icon="mdi-up"></v-btn>
    <v-btn density="compact" icon="mdi-down"></v-btn>
    <v-btn density="compact" icon="mdi-plus"></v-btn>
  </div>
</template>

<style scoped></style>
