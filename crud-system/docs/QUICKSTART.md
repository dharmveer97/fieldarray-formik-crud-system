# Quick Start Guide

## 🚀 Run the Project

```bash
npm run dev
```

Visit: http://localhost:3000/crud

---

## 📖 Understanding the Code

### For Interns: Code Organization

#### 1. **Atoms** (`components/atoms/`)
Think of these as LEGO blocks - the smallest pieces.

```typescript
// FormField.tsx - Just an input with error message
<FormField name="email" value="test@test.com" error="Invalid email" />
```

#### 2. **Molecules** (`components/molecules/`)
Combinations of atoms - like a LEGO car made from blocks.

```typescript
// CrudTableRow.tsx - A row with multiple FormFields
<CrudTableRow item={user} config={userConfig} />
```

#### 3. **Organisms** (`components/forms/`)
Complex components - like a complete LEGO set.

```typescript
// CrudTable.tsx - Complete table with all functionality
<CrudTable config={userConfig} items={users} />
```

---

## 🎯 How to Add a New CRUD

### Example: Adding "Customers" CRUD

#### Step 1: Define the Type (What data looks like)

```typescript
// lib/types/entities.ts
export interface Customer extends BaseEntity {
  name: string;
  company: string;
  email: string;
}
```

#### Step 2: Create the Config (How it behaves)

```typescript
// lib/schemas/customer.schema.ts
import * as Yup from 'yup';
import { CrudConfig, Customer } from '@/lib/types';

export const customerConfig: CrudConfig<Customer> = {
  name: 'Customers',                    // Tab name
  apiEndpoint: 'users',                 // API endpoint
  emptyItem: {                          // Default values for new row
    name: '',
    company: '',
    email: ''
  },
  fields: [                             // Table columns
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' }
  ],
  validationSchema: Yup.array().of(    // Validation rules
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      company: Yup.string().required('Company is required'),
      email: Yup.string().email('Invalid email').required('Email is required')
    })
  )
};
```

#### Step 3: Add to Page (Use it)

```typescript
// app/crud/page.tsx

// 1. Import
import { customerConfig } from '@/lib/schemas/customer.schema';
import { Customer } from '@/lib/types';

// 2. Add hook
const {
  items: customers,
  createItem: createCustomer,
  updateItem: updateCustomer,
  deleteItem: deleteCustomer
} = useCrud<Customer>(customerConfig.apiEndpoint);

// 3. Add save handler
const handleSaveCustomers = async (items: Customer[], dirtyIndexes: number[]) => {
  for (const idx of dirtyIndexes) {
    const customer = items[idx];
    if (customer.id === 0) {
      await createCustomer(customer);
    } else {
      await updateCustomer(customer.id, customer);
    }
  }
};

// 4. Add tab
<TabsTrigger 
  active={activeTab === 'customers'} 
  onClick={() => setActiveTab('customers')}
>
  {customerConfig.name}
</TabsTrigger>

// 5. Add content
{activeTab === 'customers' && (
  <TabsContent>
    <CrudTable
      config={customerConfig}
      items={customers}
      onSave={handleSaveCustomers}
      onDelete={deleteCustomer}
    />
  </TabsContent>
)}
```

**That's it!** You now have a fully functional Customers CRUD.

---

## 🧠 Understanding Formik

### What is Formik?
Formik manages form state so you don't have to write `useState` for every field.

### Key Concepts:

#### 1. **initialValues**
Starting data for the form.
```typescript
<Formik initialValues={[{ name: 'John', email: 'john@test.com' }]}>
```

#### 2. **dirty**
Has the form been changed?
```typescript
const { dirty } = useFormikContext();
// dirty = false initially
// dirty = true after user edits
```

#### 3. **resetForm**
Reset form to new values.
```typescript
resetForm({ values: newData });
```

#### 4. **FieldArray**
Manage array of items (add/remove rows).
```typescript
<FieldArray name="items">
  {({ push, remove }) => (
    <button onClick={() => push(newItem)}>Add</button>
  )}
</FieldArray>
```

---

## 🎨 Code Flow Example

### User adds a new customer:

```
1. User clicks "Add Row"
   ↓
2. FieldArray.push() adds { id: 0, name: '', company: '', email: '' }
   ↓
3. Formik.dirty = true (form has changes)
   ↓
4. User fills in fields
   ↓
5. User clicks "Save & Continue"
   ↓
6. handleSubmit() runs
   ↓
7. Compares current values vs initial values
   ↓
8. Finds dirty indexes (new/changed items)
   ↓
9. Calls onSave with only dirty items
   ↓
10. Page handler creates/updates items via API
    ↓
11. resetForm() resets dirty state
    ↓
12. Toast shows "Saved 1 item(s)"
```

---

## 📁 File Organization

### Why this structure?

```
components/
  atoms/          ← Small, reusable pieces
  molecules/      ← Combinations of atoms
  forms/          ← Complex form components
  ui/             ← Third-party UI components

lib/
  types/          ← TypeScript interfaces
  schemas/        ← CRUD configurations
  hooks/          ← Reusable logic
  utils/          ← Helper functions
```

**Benefits:**
- Easy to find files
- Easy to reuse code
- Easy for new developers to understand
- Easy to test individual pieces

---

## 🔍 Common Tasks

### Task 1: Change validation rule
```typescript
// lib/schemas/user.schema.ts
name: Yup.string()
  .required('Required')
  .min(3, 'Min 3 characters')  // ← Change this
```

### Task 2: Add new field
```typescript
// 1. Add to type
export interface User extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  age: number;  // ← New field
}

// 2. Add to config
fields: [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'age', label: 'Age', type: 'number' }  // ← New field
],

// 3. Add to validation
validationSchema: Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid').required('Required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, '10 digits').required('Required'),
    age: Yup.number().required('Required').positive().integer()  // ← New validation
  })
)
```

### Task 3: Change API endpoint
```typescript
// lib/schemas/user.schema.ts
export const userConfig: CrudConfig<User> = {
  name: 'Users',
  apiEndpoint: 'api/v2/users',  // ← Change this
  // ...
};
```

---

## 💡 Tips for Interns

### 1. Start Small
- Understand atoms first (FormField, DeleteButton)
- Then molecules (CrudTableRow)
- Then organisms (CrudTable)

### 2. Read the Types
```typescript
// Types tell you what data looks like
interface User {
  id: number;      // Every user has an id
  name: string;    // Every user has a name
  email: string;   // Every user has an email
}
```

### 3. Follow the Pattern
- Look at existing schemas (user.schema.ts, product.schema.ts)
- Copy the pattern for new CRUDs
- Change only the specific details

### 4. Use Console.log
```typescript
const handleSubmit = (values, { setSubmitting }) => {
  console.log('Current values:', values);
  console.log('Initial values:', items);
  console.log('Dirty indexes:', dirtyIndexes);
  // ...
};
```

---

## 🐛 Debugging

### Form not saving?
1. Check console for errors
2. Check if `dirty` is true
3. Check if validation passes

### Field not showing?
1. Check if field is in `config.fields`
2. Check if field is in type definition
3. Check if field is in validation schema

### Delete not working?
1. Check if `onDelete` is passed to CrudTable
2. Check if API endpoint is correct
3. Check console for API errors

---

## 📚 Next Steps

1. Read `docs/README.md` for detailed documentation
2. Try adding a new CRUD (follow Step 1-3 above)
3. Experiment with validation rules
4. Add custom styling to components

---

## 🎯 Summary

**To add a new CRUD:**
1. Define type in `lib/types/entities.ts`
2. Create schema in `lib/schemas/yourmodel.schema.ts`
3. Add to page in `app/crud/page.tsx`

**That's it!** The system handles everything else automatically.
