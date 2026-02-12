import * as Yup from 'yup';

export const productValidation = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required('Required').min(2, 'Min 2 chars'),
  price: Yup.number().required('Required').positive('Must be positive'),
  stock: Yup.number().required('Required').integer('Must be integer').min(0, 'Cannot be negative')
});

export const productArrayValidation = Yup.object({
  items: Yup.array().of(productValidation).required()
});

export type ProductSchema = Yup.InferType<typeof productValidation>;
