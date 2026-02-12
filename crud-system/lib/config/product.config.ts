import { CrudConfig } from '@/lib/types';
import { ProductSchema, productArrayValidation } from '@/lib/schemas/product.schema';

export const productConfig: CrudConfig<ProductSchema> = {
  name: 'Products',
  apiEndpoint: 'posts',
  emptyItem: { id: 0, name: '', price: 0, stock: 0 },
  fields: [
    { name: 'name', label: 'Product Name', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' }
  ],
  validationSchema: productArrayValidation
};
