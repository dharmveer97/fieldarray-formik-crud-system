# Project Structure

```
erp-landing/
├── app/
│   ├── crud/
│   │   └── page.tsx                    # Main CRUD page
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── atoms/                          # Atomic components
│   │   ├── FormField.tsx              # Input with error display
│   │   ├── DeleteButton.tsx           # Delete action button
│   │   └── AddRowButton.tsx           # Add row button
│   │
│   ├── molecules/                      # Composed components
│   │   └── CrudTableRow.tsx           # Single table row
│   │
│   ├── forms/                          # Form components
│   │   └── CrudTable.tsx              # Complete CRUD table
│   │
│   └── ui/                             # shadcn UI components
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── input.tsx
│       └── button.tsx
│
├── lib/
│   ├── types/                          # TypeScript definitions
│   │   ├── entities.ts                # Data models (User, Product)
│   │   ├── crud.ts                    # CRUD config types
│   │   └── index.ts                   # Type exports
│   │
│   ├── schemas/                        # CRUD configurations
│   │   ├── user.schema.ts             # User CRUD config
│   │   └── product.schema.ts          # Product CRUD config
│   │
│   ├── hooks/                          # Custom React hooks
│   │   └── useCrud.ts                 # API operations hook
│   │
│   └── utils/                          # Utility functions
│       ├── formik.ts                  # Formik helpers
│       ├── toast.ts                   # Toast notifications
│       └── utils.ts                   # General utilities
│
├── docs/                               # Documentation
│   ├── README.md                      # Main documentation
│   ├── QUICKSTART.md                  # Quick start guide
│   ├── REUSABLE_CRUD.md              # Reusable system docs
│   ├── OPTIMIZED.md                   # Optimization details
│   ├── CRUD_README.md                 # CRUD features
│   ├── COMPLETE.md                    # Complete guide
│   └── ARCHITECTURE.md                # Architecture overview
│
├── public/                             # Static assets
├── node_modules/                       # Dependencies
├── package.json                        # Project dependencies
├── tsconfig.json                       # TypeScript config
├── next.config.ts                      # Next.js config
└── README.md                           # Project README
```

## Key Directories

### `/app` - Next.js App Router
- Pages and layouts
- Server and client components

### `/components` - React Components
- **atoms**: Smallest reusable pieces
- **molecules**: Combinations of atoms
- **forms**: Complex form components
- **ui**: Third-party UI library components

### `/lib` - Business Logic
- **types**: TypeScript interfaces and types
- **schemas**: CRUD configurations
- **hooks**: Custom React hooks
- **utils**: Pure utility functions

### `/docs` - Documentation
- All project documentation
- Guides and references

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `FormField.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useCrud.ts`)
- Utils: `camelCase.ts` (e.g., `formik.ts`)
- Types: `camelCase.ts` (e.g., `entities.ts`)
- Schemas: `camelCase.schema.ts` (e.g., `user.schema.ts`)

## Import Aliases

```typescript
@/*  →  Root directory
```

Example:
```typescript
import { User } from '@/lib/types';
import { FormField } from '@/components/atoms/FormField';
```

## TypeScript

✅ All files type-checked with `npx tsc --noEmit`
✅ Strict mode enabled
✅ No implicit any
