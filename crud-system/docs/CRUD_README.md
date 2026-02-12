# CRUD Management System

A complete CRUD application built with Next.js, Formik, Yup, and shadcn/ui components.

## Features

✅ **Two Tabs**: Users and Products management
✅ **Shadcn Tables**: Clean, accessible table components
✅ **Formik Field Arrays**: Dynamic row addition/deletion
✅ **Yup Validation**: Real-time form validation with error messages
✅ **CRUD Operations**: Create, Read, Update, Delete using JSONPlaceholder API
✅ **Error Handling**: Toast notifications for success/error states
✅ **Clean Architecture**: Separated into hooks, components, and pages

## Structure

```
├── app/
│   ├── crud/
│   │   └── page.tsx          # Main CRUD page with tabs
│   ├── layout.tsx             # Root layout with Toaster
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn components
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── input.tsx
│   │   └── button.tsx
│   ├── UserTable.tsx          # User table with Formik field array
│   └── ProductTable.tsx       # Product table with Formik field array
├── hooks/
│   └── useApi.ts              # Custom hooks for API calls
└── lib/
    ├── types.ts               # TypeScript interfaces
    ├── validations.ts         # Yup schemas
    └── utils.ts               # Utility functions
```

## Usage

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to**: http://localhost:3000/crud

3. **Features**:
   - Switch between Users and Products tabs
   - Edit data directly in table cells
   - Add new rows with "Add Row" button
   - Delete rows with trash icon
   - Click "Save & Continue" to persist changes
   - Real-time validation with error messages

## API

Uses JSONPlaceholder (https://jsonplaceholder.typicode.com) for:
- `/users` - User data
- `/posts` - Product data (mapped from posts)

## Validation Rules

**Users**:
- Name: Required, min 2 characters
- Email: Required, valid email format
- Phone: Required, exactly 10 digits

**Products**:
- Name: Required, min 2 characters
- Price: Required, positive number
- Stock: Required, non-negative integer

## Technologies

- Next.js 16
- React 19
- Formik 2.4
- Yup 1.7
- shadcn/ui
- Tailwind CSS 4
- Sonner (toast notifications)
- Lucide React (icons)
