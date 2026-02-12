# 🚀 Reusable CRUD System

## Add 100s of CRUDs in Minutes!

This system is fully modular and reusable. Just define a schema and everything works automatically.

## 📁 Folder Structure

```
├── components/
│   └── forms/
│       └── GenericCrudTable.tsx    # ✨ Universal table component
├── hooks/
│   └── useCrudApi.ts               # ✨ Universal API hook
├── lib/
│   ├── crud-config.ts              # Type definitions
│   └── schemas/                    # 👈 Add your schemas here
│       ├── user.schema.ts
│       ├── product.schema.ts
│       └── order.schema.ts         # Example
└── app/
    └── crud/
        └── page.tsx                # Main page
```

## ⚡ How to Add a New CRUD (30 seconds!)

### Step 1: Create Schema File

Create `lib/schemas/yourmodel.schema.ts`:

```typescript
import * as Yup from 'yup';
import { CrudConfig } from '@/lib/crud-config';

export interface YourModel {
  id: number;
  field1: string;
  field2: number;
}

export const yourModelCrudConfig: CrudConfig<YourModel> = {
  name: 'Your Models',
  apiEndpoint: 'your-endpoint',
  defaultItem: { id: 0, field1: '', field2: 0 },
  fields: [
    {
      name: 'field1',
      label: 'Field 1',
      type: 'text',
      validation: Yup.string().required('Required'),
      defaultValue: ''
    },
    {
      name: 'field2',
      label: 'Field 2',
      type: 'number',
      validation: Yup.number().required('Required'),
      defaultValue: 0
    }
  ],
  validationSchema: Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        field1: Yup.string().required('Required'),
        field2: Yup.number().required('Required'),
      })
    )
  })
};
```

### Step 2: Add to Page

In `app/crud/page.tsx`:

```typescript
import { yourModelCrudConfig } from '@/lib/schemas/yourmodel.schema';

// Add hook
const { items, updateItem, deleteItem } = useCrudApi<YourModel>(
  yourModelCrudConfig.apiEndpoint
);

// Add tab
<TabsTrigger onClick={() => setActiveTab('yourmodel')}>
  {yourModelCrudConfig.name}
</TabsTrigger>

// Add content
{activeTab === 'yourmodel' && (
  <TabsContent>
    <GenericCrudTable
      config={yourModelCrudConfig}
      initialItems={items}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  </TabsContent>
)}
```

### That's it! ✅

## 🎯 Features

✅ **One Component for All**: `GenericCrudTable` handles everything
✅ **One Hook for All**: `useCrudApi` handles all API calls
✅ **Schema-Driven**: Just define fields, validation auto-works
✅ **Field Array Built-in**: Add/delete rows automatically
✅ **Validation Built-in**: Yup validation with error messages
✅ **Delete Confirmation**: Yes/No toast automatically
✅ **Type-Safe**: Full TypeScript support
✅ **Zero Duplication**: Write once, use everywhere

## 📝 Field Types Supported

- `text` - Text input
- `email` - Email input
- `number` - Number input
- `tel` - Phone input

## 🔧 Customization

### Custom API Transformer

```typescript
useCrudApi<YourModel>(
  'endpoint',
  (data) => data.map(item => ({
    id: item.id,
    field1: item.customField,
    field2: item.anotherField
  }))
);
```

### Custom Validation

```typescript
validation: Yup.string()
  .required('Required')
  .min(5, 'Min 5 chars')
  .max(50, 'Max 50 chars')
  .matches(/^[A-Z]/, 'Must start with capital')
```

## 🚀 Usage

```bash
npm run dev
```

Visit: http://localhost:3000/crud

## 💡 Example: Add Orders CRUD

Already created in `lib/schemas/order.schema.ts` - just uncomment in the page!

## 🎨 Benefits

- **Add 100 CRUDs** without writing repetitive code
- **Consistent UI** across all tables
- **Centralized validation** logic
- **Easy maintenance** - change once, affects all
- **Scalable** - perfect for large ERP systems
