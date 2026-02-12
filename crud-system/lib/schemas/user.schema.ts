import * as Yup from 'yup';

export const userValidation = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required('Required').min(2, 'Min 2 chars'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, '10 digits').required('Required')
});

export const userArrayValidation = Yup.object({
  items: Yup.array().of(userValidation).required()
});

export type UserSchema = Yup.InferType<typeof userValidation>;
