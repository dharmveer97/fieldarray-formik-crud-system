# React Guide Part 4: Context, Other Hooks & APIs

## Context & Other Hooks

---

## useContext

**What it does:** Reads value from React Context (share data without props)

**When to use:** When many components need same data (theme, user, language)

### Basic Syntax:
```tsx
const value = useContext(MyContext)
```

### Example 1: Theme Context
```tsx
// app/context/ThemeContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

```tsx
// app/layout.tsx
import { ThemeProvider } from './context/ThemeContext'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// app/components/ThemeToggle.tsx
'use client'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Example 2: User Context
```tsx
// app/context/UserContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type User = { id: string; name: string; email: string } | null

type UserContextType = {
  user: User
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  
  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
```

```tsx
// app/components/UserProfile.tsx
'use client'
import { useUser } from '../context/UserContext'

export default function UserProfile() {
  const { user, logout } = useUser()
  
  if (!user) {
    return <p>Not logged in</p>
  }
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Example 3: Multiple Contexts
```tsx
'use client'
import { useTheme } from '../context/ThemeContext'
import { useUser } from '../context/UserContext'

export default function Dashboard() {
  const { theme } = useTheme()
  const { user } = useUser()
  
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <h1>Dashboard</h1>
      {user && <p>Hello, {user.name}</p>}
    </div>
  )
}
```

---

## useId

**What it does:** Generates unique IDs for accessibility

**When to use:** Form labels, ARIA attributes

### Example: Form with Labels
```tsx
'use client'
import { useId } from 'react'

export default function Form() {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  
  return (
    <form>
      <div>
        <label htmlFor={nameId}>Name:</label>
        <input id={nameId} type="text" />
      </div>
      
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input id={emailId} type="email" />
      </div>
      
      <div>
        <label htmlFor={passwordId}>Password:</label>
        <input id={passwordId} type="password" />
      </div>
    </form>
  )
}
```

### Example: Reusable Input Component
```tsx
'use client'
import { useId } from 'react'

function Input({ label, ...props }: { label: string; [key: string]: any }) {
  const id = useId()
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  )
}

export default function SignupForm() {
  return (
    <form>
      <Input label="Username" type="text" />
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
    </form>
  )
}
```

---

## useSyncExternalStore

**What it does:** Subscribes to external store (non-React state)

**When to use:** Browser APIs, third-party state libraries

### Example: Window Width
```tsx
'use client'
import { useSyncExternalStore } from 'react'

function useWindowWidth() {
  return useSyncExternalStore(
    // Subscribe
    (callback) => {
      window.addEventListener('resize', callback)
      return () => window.removeEventListener('resize', callback)
    },
    // Get snapshot
    () => window.innerWidth,
    // Server snapshot
    () => 0
  )
}

export default function WindowSize() {
  const width = useWindowWidth()
  
  return <div>Window width: {width}px</div>
}
```

### Example: Online Status
```tsx
'use client'
import { useSyncExternalStore } from 'react'

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback)
      window.addEventListener('offline', callback)
      return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
      }
    },
    () => navigator.onLine,
    () => true
  )
}

export default function OnlineIndicator() {
  const isOnline = useOnlineStatus()
  
  return (
    <div style={{ color: isOnline ? 'green' : 'red' }}>
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  )
}
```

---

## useDebugValue

**What it does:** Shows custom label in React DevTools

**When to use:** Custom hooks (for debugging)

### Example: Custom Hook with Debug
```tsx
'use client'
import { useState, useDebugValue } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  
  // Shows in React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline')
  
  return isOnline
}

export default function Component() {
  const isOnline = useOnlineStatus()
  return <div>{isOnline ? 'Connected' : 'Disconnected'}</div>
}
```

---

## useFormStatus

**NEW in React 19! (React DOM)**

**What it does:** Gets form submission status

**When to use:** Show loading state in form buttons

### Example: Submit Button
```tsx
// app/components/SubmitButton.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

```tsx
// app/contact/page.tsx
import { SubmitButton } from '../components/SubmitButton'
import { submitForm } from './actions'

export default function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <SubmitButton />
    </form>
  )
}
```

---

## React APIs

---

## cache

**What it does:** Memoizes function results (server-side)

**When to use:** Expensive server-side operations

### Example: Database Query
```tsx
// app/lib/data.ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  console.log('Fetching user:', id)
  const user = await db.user.findUnique({ where: { id } })
  return user
})

// Called multiple times, but only fetches once
const user1 = await getUser('123')
const user2 = await getUser('123') // Uses cached result
```

---

## createContext

**What it does:** Creates a Context object

**When to use:** Share data across component tree

### Example: Settings Context
```tsx
// app/context/SettingsContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Settings = {
  language: string
  notifications: boolean
}

type SettingsContextType = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    language: 'en',
    notifications: true
  })
  
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }
  
  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}
```

---

## lazy

**What it does:** Lazy load components (code splitting)

**When to use:** Large components not needed immediately

### Example: Lazy Load Modal
```tsx
'use client'
import { lazy, Suspense, useState } from 'react'

// Only loads when needed
const HeavyModal = lazy(() => import('./HeavyModal'))

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  )
}
```

---

## memo

**What it does:** Memoizes component (prevents re-render)

**When to use:** Component re-renders often with same props

### Example: Memoized Component
```tsx
'use client'
import { memo, useState } from 'react'

// Only re-renders when props change
const ExpensiveComponent = memo(({ value }: { value: number }) => {
  console.log('Rendering ExpensiveComponent')
  return <div>Value: {value}</div>
})

export default function Parent() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setOther(other + 1)}>Other: {other}</button>
      
      {/* Only re-renders when count changes */}
      <ExpensiveComponent value={count} />
    </div>
  )
}
```

---

## startTransition

**What it does:** Marks updates as non-urgent (without hook)

**When to use:** Same as useTransition, but outside component

### Example: Router Navigation
```tsx
'use client'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()
  
  const navigate = (path: string) => {
    startTransition(() => {
      router.push(path)
    })
  }
  
  return (
    <nav>
      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/about')}>About</button>
    </nav>
  )
}
```

---

## use

**NEW in React 19!**

**What it does:** Reads value from Promise or Context

**When to use:** Async data in components

### Example: Read Promise
```tsx
'use client'
import { use, Suspense } from 'react'

async function fetchData() {
  const res = await fetch('/api/data')
  return res.json()
}

function DataComponent({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = use(dataPromise) // Suspends until resolved
  
  return <div>{data.title}</div>
}

export default function Page() {
  const dataPromise = fetchData()
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  )
}
```

---

## Quick Reference

### Context & Other Hooks:

| Hook | Purpose | Use Case |
|------|---------|----------|
| `useContext` | Read context | Theme, user, settings |
| `useId` | Generate unique ID | Form labels, ARIA |
| `useSyncExternalStore` | Subscribe to external store | Browser APIs |
| `useDebugValue` | Debug label | Custom hooks |
| `useFormStatus` | Form status | Submit buttons |

### React APIs:

| API | Purpose | Use Case |
|-----|---------|----------|
| `cache` | Memoize server function | Database queries |
| `createContext` | Create context | Share data |
| `lazy` | Lazy load component | Code splitting |
| `memo` | Memoize component | Prevent re-renders |
| `startTransition` | Non-urgent update | Navigation |
| `use` | Read Promise/Context | Async data |

---

Content was rephrased for compliance with licensing restrictions.

References:
[1] useContext - https://react.dev/reference/react/useContext
[2] useId - https://react.dev/reference/react/useId
[3] cache - https://react.dev/reference/react/cache
[4] lazy - https://react.dev/reference/react/lazy
[5] memo - https://react.dev/reference/react/memo
[6] use - https://react.dev/reference/react/use
