<script lang="ts" setup>
import {
  FieldProps,
  TextFieldConfig,
} from "@/shared/lib/process/form-builder/field/types";

const props = defineProps<FieldProps<TextFieldConfig>>();
const emit = defineEmits<{
  (e: "handleChange", value: string): void;
}>();
</script>

<template>
  <v-text-field
    :density="'compact'"
    :model-value="props.value"
    :name="props.config.name"
    :v-bind="props.config"
    type="text"
    @update:model-value="emit('handleChange', $event)"
  >
  </v-text-field>
</template>

<style scoped></style>
