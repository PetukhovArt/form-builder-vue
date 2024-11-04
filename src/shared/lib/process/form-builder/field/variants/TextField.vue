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
    :density="'comfortable'"
    :error-messages="props.error"
    :style="{ paddingBottom: props.error ? '10px' : '0' }"
    :variant="'outlined'"
    :model-value="props.value"
    :name="props.config.name"
    type="text"
    @update:model-value="emit('handleChange', $event)"
    v-bind="props.config"
  >
  </v-text-field>
</template>

<style scoped></style>
