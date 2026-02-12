import * as Yup from 'yup';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'tel';
}

export interface CrudConfig<T extends { id: number }> {
  name: string;
  fields: FieldConfig[];
  validationSchema: Yup.AnySchema;
  apiEndpoint: string;
  emptyItem: T;
}
