# React Guide Part 5: Built-in Components & Complete Summary

## Built-in Components

---

## Fragment

**What it does:** Groups elements without adding extra DOM node

**When to use:** Return multiple elements without wrapper

### Syntax:
```tsx
// Long form
<Fragment>...</Fragment>

// Short form (more common)
<>...</>
```

### Example 1: Basic Fragment
```tsx
export default function List() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </>
  )
}
```

### Example 2: Fragment with Key
```tsx
export default function Table({ items }: { items: any[] }) {
  return (
    <table>
      <tbody>
        {items.map(item => (
          <Fragment key={item.id}>
            <tr>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td>{item.description}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}
```

---

## Suspense

**What it does:** Shows fallback while children load

**When to use:** Lazy loading, async data fetching

### Example 1: Lazy Component
```tsx
'use client'
import { Suspense, lazy } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      
      <Suspense fallback={<div>Loading component...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}
```

### Example 2: Async Data (Server Component)
```tsx
// app/page.tsx
import { Suspense } from 'react'
import Posts from './Posts'

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  )
}

// app/Posts.tsx
async function Posts() {
  const posts = await fetch('https://api.example.com/posts')
  const data = await posts.json()
  
  return (
    <ul>
      {data.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Example 3: Multiple Suspense Boundaries
```tsx
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Each loads independently */}
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <Statistics />
      </Suspense>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <RecentPosts />
      </Suspense>
    </div>
  )
}
```

---

## StrictMode

**What it does:** Enables extra development checks

**When to use:** Always (in development)

### Example:
```tsx
// app/layout.tsx
import { StrictMode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <StrictMode>
          {children}
        </StrictMode>
      </body>
    </html>
  )
}
```

### What StrictMode Checks:
1. **Unsafe lifecycle methods** - Warns about deprecated methods
2. **Legacy string refs** - Warns about old ref API
3. **Unexpected side effects** - Runs effects twice to find bugs
4. **Legacy context API** - Warns about old context
5. **Reusable state** - Helps find state bugs

---

## Profiler

**What it does:** Measures rendering performance

**When to use:** Find slow components

### Example:
```tsx
'use client'
import { Profiler } from 'react'

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`)
}

export default function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <Main />
      <Sidebar />
    </Profiler>
  )
}
```

---

## Complete React Hooks & APIs Summary

### All Hooks at a Glance:

#### State Hooks
```tsx
// Simple state
const [state, setState] = useState(initialValue)

// Complex state with actions
const [state, dispatch] = useReducer(reducer, initialState)

// Form state with server actions (NEW)
const [state, formAction, isPending] = useActionState(action, initialState)

// Optimistic updates (NEW)
const [optimisticState, setOptimistic] = useOptimistic(currentState)
```

#### Effect Hooks
```tsx
// Side effects after render
useEffect(() => { /* effect */ return () => { /* cleanup */ } }, [deps])

// Before browser paint
useLayoutEffect(() => { /* effect */ }, [deps])

// Before DOM mutations (CSS-in-JS)
useInsertionEffect(() => { /* effect */ }, [deps])

// Stable event handler (NEW)
const onEvent = useEffectEvent((arg) => { /* handler */ })
```

#### Ref Hooks
```tsx
// Mutable value (no re-render)
const ref = useRef(initialValue)

// Customize ref exposed to parent
useImperativeHandle(ref, () => ({ /* methods */ }), [deps])
```

#### Performance Hooks
```tsx
// Memoize value
const memoizedValue = useMemo(() => computeValue(), [deps])

// Memoize function
const memoizedFn = useCallback(() => { /* fn */ }, [deps])

// Non-urgent updates
const [isPending, startTransition] = useTransition()

// Defer value updates
const deferredValue = useDeferredValue(value)
```

#### Context & Other Hooks
```tsx
// Read context
const value = useContext(MyContext)

// Generate unique ID
const id = useId()

// Subscribe to external store
const snapshot = useSyncExternalStore(subscribe, getSnapshot)

// Debug label
useDebugValue(value)
```

#### React DOM Hooks
```tsx
// Form submission status (NEW)
const { pending, data, method, action } = useFormStatus()
```

---

### All React APIs:

```tsx
// Memoize server function
const cachedFn = cache(async () => { /* fn */ })

// Create context
const MyContext = createContext(defaultValue)

// Lazy load component
const Component = lazy(() => import('./Component'))

// Memoize component
const MemoComponent = memo(Component)

// Start transition (non-hook)
startTransition(() => { /* update */ })

// Read Promise or Context (NEW)
const value = use(promiseOrContext)
```

---

## Common Patterns & Best Practices

### 1. Custom Hooks
```tsx
// app/hooks/useLocalStorage.ts
'use client'
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue] as const
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage('name', '')
  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

### 2. Compound Components
```tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type TabsContextType = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function Tabs({ children, defaultTab }: {
  children: ReactNode
  defaultTab: string
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}

export function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  
  const { activeTab, setActiveTab } = context
  
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')
  
  const { activeTab } = context
  
  if (activeTab !== id) return null
  
  return <div role="tabpanel">{children}</div>
}

// Usage
function App() {
  return (
    <Tabs defaultTab="home">
      <TabList>
        <Tab id="home">Home</Tab>
        <Tab id="profile">Profile</Tab>
        <Tab id="settings">Settings</Tab>
      </TabList>
      
      <TabPanel id="home">Home content</TabPanel>
      <TabPanel id="profile">Profile content</TabPanel>
      <TabPanel id="settings">Settings content</TabPanel>
    </Tabs>
  )
}
```

### 3. Error Boundaries (Class Component)
```tsx
'use client'
import { Component, ReactNode } from 'react'

type Props = { children: ReactNode; fallback: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    
    return this.props.children
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  )
}
```

---

## Rules of React

### 1. Components Must Be Pure
```tsx
// ❌ Wrong - side effect in render
function Component() {
  document.title = 'Hello' // Side effect!
  return <div>Hello</div>
}

// ✅ Correct - side effect in useEffect
function Component() {
  useEffect(() => {
    document.title = 'Hello'
  }, [])
  return <div>Hello</div>
}
```

### 2. Hooks Rules
```tsx
// ❌ Wrong - conditional hook
function Component({ condition }) {
  if (condition) {
    const [state, setState] = useState(0) // Error!
  }
}

// ✅ Correct - hooks at top level
function Component({ condition }) {
  const [state, setState] = useState(0)
  
  if (condition) {
    // Use state here
  }
}
```

### 3. Don't Mutate State
```tsx
// ❌ Wrong - mutating state
const [user, setUser] = useState({ name: 'John' })
user.name = 'Jane' // Don't do this!

// ✅ Correct - create new object
setUser({ ...user, name: 'Jane' })
```

---

## Performance Checklist

- [ ] Use `memo()` for expensive components
- [ ] Use `useMemo()` for expensive calculations
- [ ] Use `useCallback()` for functions passed to children
- [ ] Use `lazy()` for code splitting
- [ ] Use `Suspense` for loading states
- [ ] Use `useTransition` for slow updates
- [ ] Use `useDeferredValue` for responsive inputs
- [ ] Avoid inline objects/arrays in props
- [ ] Keep component tree shallow
- [ ] Profile with React DevTools

---

## Next.js Integration Tips

### Server Components (Default)
```tsx
// app/page.tsx - Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

### Client Components (Interactive)
```tsx
// app/components/Counter.tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Mix Both
```tsx
// app/page.tsx - Server Component
import Counter from './components/Counter' // Client Component

export default async function Page() {
  const data = await fetchData() // Server-side
  
  return (
    <div>
      <h1>{data.title}</h1>
      <Counter /> {/* Client-side interactivity */}
    </div>
  )
}
```

---

## Complete Example: Todo App

```tsx
'use client'
import { useState, useReducer, useId, memo } from 'react'

type Todo = { id: number; text: string; completed: boolean }
type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number }

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case 'delete':
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

const TodoItem = memo(({ todo, onToggle, onDelete }: {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}) => (
  <li>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={onToggle}
    />
    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
    </span>
    <button onClick={onDelete}>Delete</button>
  </li>
))

export default function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState('')
  const inputId = useId()
  
  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'add', text: input })
      setInput('')
    }
  }
  
  return (
    <div>
      <h1>Todo App</h1>
      
      <div>
        <label htmlFor={inputId}>New Todo:</label>
        <input
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch({ type: 'toggle', id: todo.id })}
            onDelete={() => dispatch({ type: 'delete', id: todo.id })}
          />
        ))}
      </ul>
      
      <p>
        {todos.filter(t => !t.completed).length} items left
      </p>
    </div>
  )
}
```

---

## Learning Resources

1. **Official Docs:** [react.dev](https://react.dev)
2. **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
3. **React DevTools:** Browser extension for debugging
4. **TypeScript:** Type safety for React
5. **ESLint:** Catch React mistakes

---

**Last Updated:** February 10, 2026  
**React Version:** 19.2  
**Next.js Version:** 16.1.6

Content was rephrased for compliance with licensing restrictions.

References:
[1] React Reference - https://react.dev/reference/react
[2] Fragment - https://react.dev/reference/react/Fragment
[3] Suspense - https://react.dev/reference/react/Suspense
[4] StrictMode - https://react.dev/reference/react/StrictMode
[5] Profiler - https://react.dev/reference/react/Profiler
