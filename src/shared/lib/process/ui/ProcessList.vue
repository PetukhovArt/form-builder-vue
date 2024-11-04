<script lang="ts" setup>
import { BuilderForm } from "@/shared/lib/process/form-builder";
import { FormValue } from "@/shared/lib/process/form-builder/form/types";

const items = ref(["timer", "contact", "camera", "sensor", "va-event"]);
const dtoConfig = {
  fields: [
    {
      type: "text",
      label: "Текст1",
      name: "test",
      defaultValue: "xxx",
      validation: {
        type: "string",
        rules: [
          {
            min: 0,
            max: 5,
            message: "Строка должна содержать не более 5 символов",
          },
        ],
        errorType: "label",
      },
    },
    {
      type: "text",
      label: "Текст1",
      name: "test1",
      defaultValue: "zzz",
      validation: {
        type: "string",
        rules: [
          {
            min: 0,
            max: 5,
            message: "Строка должна содержать не более 5 символов",
          },
        ],
        errorType: "label",
      },
    },
    {
      type: "text",
      label: "Regina",
      name: "fsdfsdfsdfdsf",
      defaultValue: "regina",
      validation: {
        type: "string",
        rules: [
          {
            min: 6,
            max: 6,
            message: "Регина - 6 букв",
          },
        ],
        errorType: "label",
      },
    },
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
  <div class="form-wrapper">
    <v-card class="list">
      <BuilderForm
        :defaultValue="defaultValues"
        :formConfig="dtoConfig"
        @on-submit="onFormSubmit"
        @on-cancel="onFormCancel"
      />
    </v-card>
  </div>
</template>

<style scoped>
.form-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  margin-top: 20px;
  padding: 20px;
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
