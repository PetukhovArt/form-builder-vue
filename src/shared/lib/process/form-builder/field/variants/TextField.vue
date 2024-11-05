<script lang="ts" setup>
import {
  FieldProps,
  TextFieldConfig,
} from "@/shared/lib/process/form-builder/field/types";

const props = defineProps<FieldProps<TextFieldConfig>>();
const emit = defineEmits<{
  (e: "handleChange", value: string): void;
}>();

const onChange = (val: string) => {
  emit("handleChange", val);
};
const visible = ref(props.config.type !== "password");
</script>

<template>
  <v-text-field
    v-bind="props.config"
    :append-inner-icon="
      config.type !== 'password' ? '' : visible ? 'mdi-eye-off' : 'mdi-eye'
    "
    :error="!!props.error"
    :density="'comfortable'"
    :maxLength="config.maxLength ?? 30"
    :variant="'outlined'"
    :model-value="props.value"
    :name="props.config.name"
    :style="{ paddingBottom: props.config?.hint ? '10px' : '0' }"
    :type="config.type !== 'password' ? 'text' : visible ? 'text' : 'password'"
    @update:model-value="onChange"
    @click:append-inner="visible = !visible"
  >
    <template
      v-if="config.type !== 'password' && props.error"
      v-slot:append-inner
    >
      <v-btn density="compact" icon="">
        <v-icon :color="'#c55d5d'">mdi-alert-circle-outline</v-icon>
      </v-btn>
      <v-tooltip activator="parent" location="bottom"
        >{{ props.error }}
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<style scoped></style>
