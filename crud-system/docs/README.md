# CRUD System Documentation

## 📁 Project Structure

```
├── app/
│   └── crud/
│       └── page.tsx                    # Main CRUD page
│
├── components/
│   ├── atoms/                          # Smallest reusable components
│   │   ├── FormField.tsx              # Input field with error
│   │   ├── DeleteButton.tsx           # Delete action button
│   │   └── AddRowButton.tsx           # Add row button
│   │
│   ├── molecules/                      # Composed components
│   │   └── CrudTableRow.tsx           # Single table row
│   │
│   ├── forms/                          # Form components
│   │   └── CrudTable.tsx              # Complete CRUD table
│   │
│   └── ui/                             # shadcn components
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── input.tsx
│       └── button.tsx
│
├── lib/
│   ├── types/                          # TypeScript types
│   │   ├── entities.ts                # Data models (User, Product)
│   │   ├── crud.ts                    # CRUD config types
│   │   └── index.ts                   # Type exports
│   │
│   ├── schemas/                        # CRUD configurations
│   │   ├── user.schema.ts             # User CRUD config
│   │   └── product.schema.ts          # Product CRUD config
│   │
│   ├── hooks/                          # Custom hooks
│   │   └── useCrud.ts                 # API operations hook
│   │
│   └── utils/                          # Utility functions
│       ├── formik.ts                  # Formik helpers
│       └── toast.ts                   # Toast notifications
│
└── docs/
    └── README.md                       # This file
```

---

## 🎯 Architecture Principles

### Atomic Design
- **Atoms**: Basic building blocks (FormField, DeleteButton)
- **Molecules**: Combinations of atoms (CrudTableRow)
- **Organisms**: Complex components (CrudTable)
- **Pages**: Full page compositions (crud/page.tsx)

### Separation of Concerns
- **Types**: All TypeScript interfaces in `lib/types/`
- **Logic**: Business logic in hooks (`lib/hooks/`)
- **Utils**: Pure functions in `lib/utils/`
- **Config**: CRUD schemas in `lib/schemas/`
- **UI**: Components in `components/`

---

## 🔧 How It Works

### 1. Define Schema

Create a schema file in `lib/schemas/`:

```typescript
// lib/schemas/invoice.schema.ts
import * as Yup from 'yup';
import { CrudConfig, Invoice } from '@/lib/types';

export const invoiceConfig: CrudConfig<Invoice> = {
  name: 'Invoices',
  apiEndpoint: 'invoices',
  emptyItem: { number: '', amount: 0 },
  fields: [
    { name: 'number', label: 'Invoice #', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' }
  ],
  validationSchema: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required('Required'),
      amount: Yup.number().required('Required').positive()
    })
  )
};
```

### 2. Use in Page

```typescript
// app/crud/page.tsx
import { useCrud } from '@/lib/hooks/useCrud';
import { CrudTable } from '@/components/forms/CrudTable';
import { invoiceConfig } from '@/lib/schemas/invoice.schema';

const { items, createItem, updateItem, deleteItem } = useCrud<Invoice>(
  invoiceConfig.apiEndpoint
);

<CrudTable
  config={invoiceConfig}
  items={items}
  onSave={handleSave}
  onDelete={deleteItem}
/>
```

---

## 📦 Component Breakdown

### Atoms

#### FormField
```typescript
<FormField
  name="users[0].name"
  value="John"
  config={{ name: 'name', label: 'Name', type: 'text' }}
  error="Required"
  onChange={handleChange}
  onBlur={handleBlur}
/>
```

#### DeleteButton
```typescript
<DeleteButton onClick={() => handleDelete(item)} />
```

#### AddRowButton
```typescript
<AddRowButton onClick={() => push(emptyItem)} colSpan={4} />
```

### Molecules

#### CrudTableRow
```typescript
<CrudTableRow
  item={user}
  index={0}
  config={userConfig}
  onDelete={() => remove(0)}
/>
```

### Forms

#### CrudTable
```typescript
<CrudTable
  config={userConfig}
  items={users}
  onSave={handleSave}
  onDelete={deleteUser}
/>
```

---

## 🎨 Formik Integration

### Using Formik's Built-in Features

#### 1. Dirty Tracking
```typescript
const { dirty } = useFormikContext();
// dirty = true when form has changes
```

#### 2. Initial Values
```typescript
<Formik
  initialValues={items}
  enableReinitialize  // Reset when items change
>
```

#### 3. Reset Form
```typescript
resetForm({ values });  // Reset to new values after save
```

#### 4. Field Array
```typescript
<FieldArray name="items">
  {({ push, remove }) => (
    // push() adds item
    // remove(index) removes item
  )}
</FieldArray>
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────┐
│  1. useCrud Hook                                │
│     - Fetches data from API                     │
│     - Provides CRUD operations                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  2. CrudTable Component                         │
│     - Receives items as initialValues           │
│     - Formik tracks changes (dirty)             │
│     - User edits fields                         │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  3. Submit Handler                              │
│     - Compares current vs initial               │
│     - Finds dirty indexes                       │
│     - Calls onSave with only changed items      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  4. Page Handler                                │
│     - Loops through dirty indexes               │
│     - Calls createItem or updateItem            │
│     - Updates local state                       │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Adding New CRUD (Step by Step)

### Step 1: Define Type
```typescript
// lib/types/entities.ts
export interface Order extends BaseEntity {
  orderNumber: string;
  customer: string;
  amount: number;
}
```

### Step 2: Create Schema
```typescript
// lib/schemas/order.schema.ts
export const orderConfig: CrudConfig<Order> = {
  name: 'Orders',
  apiEndpoint: 'orders',
  emptyItem: { orderNumber: '', customer: '', amount: 0 },
  fields: [
    { name: 'orderNumber', label: 'Order #', type: 'text' },
    { name: 'customer', label: 'Customer', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' }
  ],
  validationSchema: Yup.array().of(
    Yup.object().shape({
      orderNumber: Yup.string().required('Required'),
      customer: Yup.string().required('Required'),
      amount: Yup.number().required('Required').positive()
    })
  )
};
```

### Step 3: Add to Page
```typescript
// app/crud/page.tsx
const { items: orders, createItem, updateItem, deleteItem } = useCrud<Order>(
  orderConfig.apiEndpoint
);

const handleSaveOrders = async (items: Order[], dirtyIndexes: number[]) => {
  for (const idx of dirtyIndexes) {
    const order = items[idx];
    if (order.id === 0) {
      await createItem(order);
    } else {
      await updateItem(order.id, order);
    }
  }
};

// In JSX:
<TabsTrigger onClick={() => setActiveTab('orders')}>
  {orderConfig.name}
</TabsTrigger>

{activeTab === 'orders' && (
  <TabsContent>
    <CrudTable
      config={orderConfig}
      items={orders}
      onSave={handleSaveOrders}
      onDelete={deleteItem}
    />
  </TabsContent>
)}
```

**Done!** Full CRUD in 3 steps.

---

## 🎯 Key Features

### 1. Smart Save
- Only sends changed items to backend
- Uses Formik's dirty tracking
- Compares current vs initial values

### 2. Validation
- Yup schema validation
- Real-time error messages
- Field-level validation

### 3. Delete Confirmation
- Centered toast notification
- Red delete button
- Gray cancel button
- 5 second duration

### 4. Type Safety
- Full TypeScript support
- Generic components
- Type inference

---

## 💡 Best Practices

### 1. Keep Atoms Small
```typescript
// ✅ Good: Single responsibility
<DeleteButton onClick={handleDelete} />

// ❌ Bad: Too much logic
<Button onClick={() => {
  if (confirm('Delete?')) {
    deleteItem(id);
    toast.success('Deleted');
  }
}} />
```

### 2. Use Utils for Reusable Logic
```typescript
// ✅ Good: Reusable function
confirmDelete('Delete user?', () => deleteUser(id));

// ❌ Bad: Duplicate code
toast('Delete?', { action: { ... } });
```

### 3. Separate Types
```typescript
// ✅ Good: Organized types
import { User, Product } from '@/lib/types';

// ❌ Bad: Inline types
interface User { ... }
```

---

## 🔍 Troubleshooting

### Form not resetting after save
```typescript
// Use resetForm with new values
resetForm({ values: newValues });
```

### Validation not working
```typescript
// Ensure validationSchema is Yup.array()
validationSchema: Yup.array().of(Yup.object().shape({ ... }))
```

### Dirty tracking not working
```typescript
// Enable reinitialize
<Formik enableReinitialize initialValues={items}>
```

---

## 📚 Resources

- [Formik Documentation](https://formik.org/docs/overview)
- [Yup Documentation](https://github.com/jquense/yup)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
