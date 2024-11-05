type Rule = { message?: string };
export type StringRule =
  | ({ ip: boolean } & Rule)
  | ({ email: boolean } & Rule)
  | ({ url: boolean } & Rule)
  | ({ regex: RegExp } & Rule)
  | ({ startsWith: string } & Rule)
  | ({ endsWith: string } & Rule)
  | ({ min: number; max: number } & Rule);

export type NumberRule =
  | ({ min: number; max: number } & Rule)
  | ({ negative: boolean } & Rule)
  | ({ nonnegative: boolean } & Rule)
  | ({ positive: boolean } & Rule);

export type FieldBase = {
  label: string;
  name: string;
  defaultValue?: unknown;
};
export type TextFieldConfig = FieldBase & {
  type: "text" | "password"; // basic text-field
  class?: string; // css
  validation?: {
    type: "string" | "number";
    rules: StringRule[] | NumberRule[];
  };
  prependInner?: string;
  placeholder?: string;
  maxWidth?: number;
  maxLength?: number;
  hint?: string;
};
export type ArrayFieldConfig = FieldBase & {
  type: "array";
  fields: FieldConfig[];
};
export type SelectFieldConfig = FieldBase & {
  type: "select";
  items: { text: string; value: any }[]; // Массив опций для выбора
  multiple?: boolean;
  chips?: boolean;
  clearable?: boolean;
  hint?: string;
};
export type MultiSelectFieldConfig = FieldBase & {
  type: "multiSelect";
  items: { text: string; value: any }[]; // Массив опций для выбора
  chips?: boolean;
  clearable?: boolean;
  hint?: string;
};
export type SearchMultiSelectFieldConfig = FieldBase & {
  type: "multiSelectSearch";
  items: { text: string; value: any }[]; // Массив опций для выбора
  chips?: boolean;
  clearable?: boolean;
  hint?: string;
  searchInput?: string; // Поле для поиска
};
export type ServerSelectFieldConfig = FieldBase & {
  type: "serverSelect";
  items: { text: string; value: any }[]; // Массив опций для выбора
  multiple?: boolean;
  chips?: boolean;
  clearable?: boolean;
  hint?: string;
  searchInput?: string; // Поле для поиска
  loading?: boolean; // Флаг загрузки данных с сервера
};
export type CheckBoxFieldConfig = FieldBase & {
  type: "checkBoxItem";
  value: boolean; // Значение чекбокса
  indeterminate?: boolean;
  hint?: string;
};
export type TimeFieldConfig = FieldBase & {
  type: "time";
  value: string; // Значение времени
  format?: "24hr" | "ampm";
  hint?: string;
};
export type CalendarFieldConfig = FieldBase & {
  type: "calendar";
  value: string | string[]; // Значение даты или диапазона дат
  multiple?: boolean;
  range?: boolean;
  hint?: string;
};
export type WeekDaysFieldConfig = FieldBase & {
  type: "weekDays";
  value: boolean[]; // Массив значений для каждого дня недели
  hint?: string;
};
export type SwitchFieldConfig = FieldBase & {
  type: "switch";
  value: boolean; // Значение переключателя
  hint?: string;
};
export type FieldConfig =
  | TextFieldConfig
  | ArrayFieldConfig
  | SelectFieldConfig
  | MultiSelectFieldConfig
  | SearchMultiSelectFieldConfig
  | ServerSelectFieldConfig
  | CheckBoxFieldConfig
  | TimeFieldConfig
  | CalendarFieldConfig
  | WeekDaysFieldConfig
  | SwitchFieldConfig;
export type FieldValue = unknown;
export type FieldProps<T extends FieldConfig> = {
  config: T;
  value: FieldValue;
  error: string | undefined;
};
