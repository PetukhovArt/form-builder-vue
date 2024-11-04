<script lang="ts" setup>
import { BuilderForm } from "@/shared/lib/process/form-builder";
import { FormValue } from "@/shared/lib/process/form-builder/form/types";

const items = ref(["timer", "contact", "camera", "sensor", "va-event"]);
const config = {
  fields: [
    { type: "text", label: "Текст1", name: "test", defaultValue: "xxx" },
    { type: "text", label: "Текст1", name: "test1", defaultValue: "zzz" },
  ],
} as const;

const defaultValues = {
  test: "xxx",
  test1: "zzz",
} as const;

const selectValue = ref("");
const onFormSubmit = (value: FormValue) => {
  console.log(value);
};
const onFormCancel = () => {
  console.log("cancel form");
};
</script>

<template>
  <v-toolbar class="flex flex-row align-center justify-center">
    <v-select
      v-model="selectValue"
      :items="items"
      class="px-4"
      density="compact"
      hide-details
      max-width="500"
    />
  </v-toolbar>
  <v-card class="list">
    <BuilderForm
      :defaultValue="defaultValues"
      :formConfig="config"
      @on-submit="onFormSubmit"
      @on-cancel="onFormCancel"
    />
  </v-card>
</template>

<style scoped>
.list {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
