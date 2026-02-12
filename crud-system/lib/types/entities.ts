export interface BaseEntity {
  id: number;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone: string;
}

export interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
}

// Generic type for any entity with Yup inference
export type InferredEntity<T> = T extends { id: number } ? T : never;
