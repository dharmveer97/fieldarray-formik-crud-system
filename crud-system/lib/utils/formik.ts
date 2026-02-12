import { FormikErrors, FormikTouched } from 'formik';

export const getFieldError = <T extends Record<string, unknown>>(
  errors: FormikErrors<T[]> | undefined,
  touched: FormikTouched<T[]> | undefined,
  index: number,
  fieldName: keyof T
): string | undefined => {
  const itemErrors = errors?.[index] as FormikErrors<T> | undefined;
  const itemTouched = touched?.[index] as FormikTouched<T> | undefined;
  
  if (!itemErrors || !itemTouched) return undefined;
  
  const error = itemErrors[fieldName];
  const isTouched = itemTouched[fieldName];
  
  return isTouched && typeof error === 'string' ? error : undefined;
};

export const hasFieldError = <T extends Record<string, unknown>>(
  errors: FormikErrors<T[]> | undefined,
  touched: FormikTouched<T[]> | undefined,
  index: number,
  fieldName: keyof T
): boolean => {
  return !!getFieldError(errors, touched, index, fieldName);
};
