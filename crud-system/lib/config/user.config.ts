import { CrudConfig } from '@/lib/types';
import { UserSchema, userArrayValidation } from '@/lib/schemas/user.schema';

export const userConfig: CrudConfig<UserSchema> = {
  name: 'Users',
  apiEndpoint: 'users',
  emptyItem: { id: 0, name: '', email: '', phone: '' },
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' }
  ],
  validationSchema: userArrayValidation
};
