# React-DOM 19.2.3 Complete Guide (Simple English)

**Version: react-dom@19.2.3 (February 2026)**

React-DOM is the package that connects React to the browser DOM (web pages).

---

## Table of Contents

1. [What is React-DOM?](#what-is-react-dom)
2. [Hooks](#hooks)
3. [Components](#components)
4. [APIs](#apis)
5. [Client APIs](#client-apis)
6. [Server APIs](#server-apis)
7. [Static APIs (NEW)](#static-apis)

---

## What is React-DOM?

**React** = Core library (components, hooks, state)  
**React-DOM** = Browser integration (rendering to HTML)

```tsx
import React from 'react'           // Core React
import ReactDOM from 'react-dom'    // Browser rendering
```

---

## Hooks

### useFormStatus

**NEW in React 19!**

**What it does:** Gets form submission status

**When to use:** Show loading state in submit buttons

#### Example 1: Basic Submit Button
```tsx
// app/components/SubmitButton.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  
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

export default function ContactForm() {
  async function handleSubmit(formData: FormData) {
    'use server'
    await saveToDatabase(formData)
  }
  
  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  )
}
```

#### Example 2: Access Form Data
```tsx
'use client'
import { useFormStatus } from 'react-dom'

export function FormDebug() {
  const { pending, data, method, action } = useFormStatus()
  
  return (
    <div>
      <p>Status: {pending ? 'Submitting' : 'Idle'}</p>
      <p>Method: {method}</p>
      {data && (
        <pre>{JSON.stringify(Object.fromEntries(data), null, 2)}</pre>
      )}
    </div>
  )
}
```

#### Example 3: Multiple Submit Buttons
```tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <button name="action" value="save" disabled={pending}>
      {pending ? 'Saving...' : 'Save Draft'}
    </button>
  )
}

export function PublishButton() {
  const { pending } = useFormStatus()
  return (
    <button name="action" value="publish" disabled={pending}>
      {pending ? 'Publishing...' : 'Publish'}
    </button>
  )
}

// Usage
export default function PostForm() {
  return (
    <form action={handleSubmit}>
      <input name="title" />
      <textarea name="content" />
      <SaveButton />
      <PublishButton />
    </form>
  )
}
```

---

## Components

React-DOM supports all HTML and SVG elements.

### Common Components

#### `<form>` - Enhanced Forms

**NEW in React 19:** Forms can use Server Actions directly

```tsx
// app/login/page.tsx
export default function LoginForm() {
  async function login(formData: FormData) {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    // Handle login
  }
  
  return (
    <form action={login}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  )
}
```

#### `<input>` - Form Inputs

```tsx
'use client'
import { useState } from 'react'

export default function Input() {
  const [value, setValue] = useState('')
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  )
}
```

#### `<select>` - Dropdown

```tsx
'use client'
import { useState } from 'react'

export default function Select() {
  const [value, setValue] = useState('apple')
  
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
  )
}
```

#### `<textarea>` - Multi-line Input

```tsx
'use client'
import { useState } from 'react'

export default function Textarea() {
  const [value, setValue] = useState('')
  
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={5}
      placeholder="Enter message"
    />
  )
}
```

#### `<link>` - Preload Resources

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preload" href="/fonts/font.woff2" as="font" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### `<meta>` - Metadata

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="My app description" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### `<script>` - External Scripts

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <script src="https://example.com/script.js" async />
      </body>
    </html>
  )
}
```

#### `<style>` - Inline Styles

```tsx
export default function Component() {
  return (
    <>
      <style>{`
        .custom {
          color: red;
          font-size: 20px;
        }
      `}</style>
      <div className="custom">Styled text</div>
    </>
  )
}
```

#### `<title>` - Page Title

```tsx
// app/page.tsx
export default function Page() {
  return (
    <>
      <title>My Page Title</title>
      <h1>Welcome</h1>
    </>
  )
}
```

---

## APIs

### createPortal

**What it does:** Renders children into different DOM node

**When to use:** Modals, tooltips, dropdowns

#### Example: Modal
```tsx
'use client'
import { createPortal } from 'react-dom'
import { useState } from 'react'

export default function Modal() {
  const [show, setShow] = useState(false)
  
  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal</button>
      
      {show && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px' }}>
            <h2>Modal Content</h2>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
```

### flushSync

**What it does:** Forces React to update DOM immediately

**When to use:** Rarely - when you need synchronous DOM updates

#### Example: Scroll to Bottom
```tsx
'use client'
import { flushSync } from 'react-dom'
import { useState, useRef } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  
  const addMessage = (text: string) => {
    flushSync(() => {
      setMessages([...messages, text])
    })
    // DOM is updated now, can scroll
    listRef.current?.scrollTo(0, listRef.current.scrollHeight)
  }
  
  return (
    <div>
      <ul ref={listRef} style={{ height: '200px', overflow: 'auto' }}>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => addMessage('New message')}>Add</button>
    </div>
  )
}
```

### Resource Preloading APIs (NEW in React 19)

#### preconnect
```tsx
import { preconnect } from 'react-dom'

export default function Page() {
  preconnect('https://api.example.com')
  return <div>Page</div>
}
```

#### prefetchDNS
```tsx
import { prefetchDNS } from 'react-dom'

export default function Page() {
  prefetchDNS('https://api.example.com')
  return <div>Page</div>
}
```

#### preload
```tsx
import { preload } from 'react-dom'

export default function Page() {
  preload('/fonts/font.woff2', { as: 'font' })
  preload('/images/hero.jpg', { as: 'image' })
  return <div>Page</div>
}
```

#### preloadModule
```tsx
import { preloadModule } from 'react-dom'

export default function Page() {
  preloadModule('/scripts/analytics.js')
  return <div>Page</div>
}
```

#### preinit
```tsx
import { preinit } from 'react-dom'

export default function Page() {
  preinit('/styles/critical.css', { as: 'style' })
  return <div>Page</div>
}
```

#### preinitModule
```tsx
import { preinitModule } from 'react-dom'

export default function Page() {
  preinitModule('/scripts/app.js')
  return <div>Page</div>
}
```

---

## Client APIs

Used in the browser to render React apps.

### createRoot

**What it does:** Creates root for React app

**When to use:** Initialize React app (Next.js does this automatically)

#### Example:
```tsx
// main.tsx (not needed in Next.js)
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
```

### hydrateRoot

**What it does:** Hydrates server-rendered HTML

**When to use:** SSR apps (Next.js does this automatically)

#### Example:
```tsx
// entry-client.tsx (not needed in Next.js)
import { hydrateRoot } from 'react-dom/client'
import App from './App'

hydrateRoot(document.getElementById('root')!, <App />)
```

---

## Server APIs

Used on the server to render React to HTML.

### renderToPipeableStream

**What it does:** Renders React to Node.js stream

**When to use:** Node.js servers (Next.js uses this internally)

#### Example:
```tsx
import { renderToPipeableStream } from 'react-dom/server'
import App from './App'

export function handler(req, res) {
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      res.setHeader('Content-Type', 'text/html')
      pipe(res)
    }
  })
}
```

### renderToReadableStream

**What it does:** Renders React to Web Stream

**When to use:** Edge runtimes, Cloudflare Workers

#### Example:
```tsx
import { renderToReadableStream } from 'react-dom/server'
import App from './App'

export async function GET() {
  const stream = await renderToReadableStream(<App />)
  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' }
  })
}
```

### renderToString

**What it does:** Renders React to HTML string

**When to use:** Simple SSR (slower than streaming)

#### Example:
```tsx
import { renderToString } from 'react-dom/server'
import App from './App'

const html = renderToString(<App />)
```

### renderToStaticMarkup

**What it does:** Renders to HTML without React attributes

**When to use:** Static HTML generation (emails, etc.)

#### Example:
```tsx
import { renderToStaticMarkup } from 'react-dom/server'

function Email({ name }) {
  return (
    <html>
      <body>
        <h1>Hello {name}!</h1>
      </body>
    </html>
  )
}

const html = renderToStaticMarkup(<Email name="John" />)
```

---

## Static APIs (NEW in React 19)

Generate static HTML at build time.

### prerender

**What it does:** Pre-renders component to static HTML

**When to use:** Static site generation

#### Example:
```tsx
import { prerender } from 'react-dom/static'
import App from './App'

const { prelude } = await prerender(<App />)
```

### prerenderToNodeStream

**What it does:** Pre-renders to Node.js stream

#### Example:
```tsx
import { prerenderToNodeStream } from 'react-dom/static'
import App from './App'

const { prelude } = await prerenderToNodeStream(<App />)
```

---

## Complete Example: Form with All Features

```tsx
// app/signup/page.tsx
import { SubmitButton } from './SubmitButton'
import { FormStatus } from './FormStatus'

export default function SignupForm() {
  async function signup(formData: FormData) {
    'use server'
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const action = formData.get('action') as string
    
    if (action === 'save') {
      // Save draft
      await saveDraft({ email, password })
    } else {
      // Complete signup
      await createAccount({ email, password })
    }
  }
  
  return (
    <form action={signup}>
      <h1>Sign Up</h1>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
        />
      </div>
      
      <div>
        <button name="action" value="save">
          Save Draft
        </button>
        <SubmitButton />
      </div>
      
      <FormStatus />
    </form>
  )
}
```

```tsx
// app/signup/SubmitButton.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      name="action"
      value="signup"
      type="submit"
      disabled={pending}
      style={{
        opacity: pending ? 0.5 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending ? 'Creating Account...' : 'Sign Up'}
    </button>
  )
}
```

```tsx
// app/signup/FormStatus.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function FormStatus() {
  const { pending, data } = useFormStatus()
  
  if (!pending) return null
  
  const action = data?.get('action')
  
  return (
    <div style={{ padding: '10px', background: '#f0f0f0' }}>
      {action === 'save' ? 'Saving draft...' : 'Creating account...'}
    </div>
  )
}
```

---

## Key Differences: React 19 vs Previous Versions

### NEW in React-DOM 19.2.3:

1. **useFormStatus Hook** - Form submission status
2. **Static APIs** - Pre-rendering at build time
3. **Resource Preloading** - Better performance APIs
4. **Enhanced Forms** - Direct Server Action support
5. **Streaming Improvements** - Better SSR performance

### Removed/Deprecated:

- `ReactDOM.render()` - Use `createRoot()` instead
- `ReactDOM.hydrate()` - Use `hydrateRoot()` instead
- String refs - Use `useRef()` or callback refs

---

## Quick Reference

### Hooks
```tsx
import { useFormStatus } from 'react-dom'
const { pending, data, method, action } = useFormStatus()
```

### Client APIs
```tsx
import { createRoot, hydrateRoot } from 'react-dom/client'
```

### Server APIs
```tsx
import {
  renderToPipeableStream,
  renderToReadableStream,
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'
```

### Static APIs (NEW)
```tsx
import {
  prerender,
  prerenderToNodeStream
} from 'react-dom/static'
```

### Resource APIs (NEW)
```tsx
import {
  preconnect,
  prefetchDNS,
  preload,
  preloadModule,
  preinit,
  preinitModule
} from 'react-dom'
```

### Portal API
```tsx
import { createPortal } from 'react-dom'
createPortal(children, domNode)
```

---

## Best Practices

1. **Use useFormStatus in separate component** - Must be child of `<form>`
2. **Prefer streaming APIs** - Better performance than `renderToString`
3. **Use resource preloading** - Improve page load times
4. **Use createPortal for modals** - Proper DOM hierarchy
5. **Avoid flushSync** - Only use when absolutely necessary

---

**Last Updated:** February 10, 2026  
**React-DOM Version:** 19.2.3  
**React Version:** 19.2.3

Content was rephrased for compliance with licensing restrictions.

References:
[1] React-DOM Reference - https://react.dev/reference/react-dom
[2] useFormStatus - https://react.dev/reference/react-dom/hooks/useFormStatus
[3] createPortal - https://react.dev/reference/react-dom/createPortal
[4] Client APIs - https://react.dev/reference/react-dom/client
[5] Server APIs - https://react.dev/reference/react-dom/server
