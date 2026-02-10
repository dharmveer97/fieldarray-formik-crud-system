# React 19 Complete Guide (Simple English)

**Latest Version: React 19.2 (February 2026)**

This guide explains everything in React with Next.js examples in simple, easy-to-understand English.

---

## Table of Contents

### Part 1: Core Concepts
1. [What is React?](#what-is-react)
2. [React vs Next.js](#react-vs-nextjs)
3. [Components Basics](#components-basics)

### Part 2: State Hooks
4. [useState - Manage Component State](#usestate)
5. [useReducer - Complex State Logic](#usereducer)
6. [useActionState - Form State (NEW in React 19)](#useactionstate)
7. [useOptimistic - Optimistic Updates (NEW in React 19)](#useoptimistic)

### Part 3: Effect Hooks
8. [useEffect - Side Effects](#useeffect)
9. [useLayoutEffect - DOM Measurements](#uselayouteffect)
10. [useInsertionEffect - CSS-in-JS](#useinsertioneffect)
11. [useEffectEvent - Stable Event Handlers (NEW)](#useeffectevent)

### Part 4: Ref Hooks
12. [useRef - Reference Values](#useref)
13. [useImperativeHandle - Customize Ref](#useimperativehandle)

### Part 5: Performance Hooks
14. [useMemo - Memoize Values](#usememo)
15. [useCallback - Memoize Functions](#usecallback)
16. [useTransition - Non-Blocking Updates](#usetransition)
17. [useDeferredValue - Defer Updates](#usedeferredvalue)

### Part 6: Context & Other Hooks
18. [useContext - Share Data](#usecontext)
19. [useId - Unique IDs](#useid)
20. [useSyncExternalStore - External State](#usesyncexternalstore)
21. [useDebugValue - Debug Custom Hooks](#usedebugvalue)

### Part 7: React DOM Hooks
22. [useFormStatus - Form State (NEW)](#useformstatus)

### Part 8: React APIs
23. [cache - Memoize Functions](#cache)
24. [createContext - Create Context](#createcontext)
25. [lazy - Code Splitting](#lazy)
26. [memo - Memoize Components](#memo)
27. [startTransition - Start Transitions](#starttransition)
28. [use - Read Resources (NEW)](#use)

### Part 9: Components
29. [Fragment - Group Elements](#fragment)
30. [Suspense - Loading States](#suspense)
31. [StrictMode - Development Checks](#strictmode)
32. [Profiler - Performance Measurement](#profiler)

---

## What is React?

**React** is a JavaScript library for building user interfaces (UIs).

### Key Concepts:
- **Components** - Reusable pieces of UI
- **State** - Data that changes over time
- **Props** - Data passed from parent to child
- **Hooks** - Functions that let you use React features

### Simple Example:
```tsx
// A React component
function Welcome() {
  return <h1>Hello, World!</h1>
}
```

---

## React vs Next.js

| Feature | React | Next.js |
|---------|-------|---------|
| **What it is** | UI library | Full framework |
| **Routing** | Need React Router | Built-in file-based routing |
| **Server-side** | Client-only by default | Server & Client components |
| **Data fetching** | Manual setup | Built-in with caching |
| **Use case** | Single-page apps | Full-stack web apps |

**In Next.js, you use React hooks and components!**

---

## Components Basics

### Function Components (Modern Way)
```tsx
// app/components/Greeting.tsx
export default function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}
```

### Using Components
```tsx
// app/page.tsx
import Greeting from './components/Greeting'

export default function Page() {
  return (
    <div>
      <Greeting name="John" />
      <Greeting name="Jane" />
    </div>
  )
}
```

---

## State Hooks

State hooks let you add state (data that changes) to your components.

---

## useState

**What it does:** Adds state to your component

**When to use:** When you need to remember and update values

### Basic Syntax:
```tsx
const [value, setValue] = useState(initialValue)
```

### Example 1: Counter
```tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  )
}
```

### Example 2: Input Field
```tsx
'use client'
import { useState } from 'react'

export default function NameForm() {
  const [name, setName] = useState('')
  
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Your name is: {name}</p>
    </div>
  )
}
```

### Example 3: Toggle
```tsx
'use client'
import { useState } from 'react'

export default function Toggle() {
  const [isOn, setIsOn] = useState(false)
  
  return (
    <div>
      <p>The light is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        Toggle
      </button>
    </div>
  )
}
```

### Example 4: Array State
```tsx
'use client'
import { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input])
      setInput('')
    }
  }
  
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Example 5: Object State
```tsx
'use client'
import { useState } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  })
  
  const updateName = (name: string) => {
    setUser({ ...user, name }) // Spread operator keeps other fields
  }
  
  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
        placeholder="Age"
      />
      
      <div>
        <h3>Profile:</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
      </div>
    </div>
  )
}
```

### Important Rules:
1. **Always use the setter function** - Don't modify state directly
2. **State updates are asynchronous** - Changes don't happen immediately
3. **Use functional updates for dependent changes**:
   ```tsx
   // ❌ Wrong - may use stale value
   setCount(count + 1)
   
   // ✅ Correct - always uses latest value
   setCount(prev => prev + 1)
   ```

---

## useReducer

**What it does:** Manages complex state logic with actions

**When to use:** When state logic is complex or involves multiple sub-values

### Basic Syntax:
```tsx
const [state, dispatch] = useReducer(reducer, initialState)
```

### Example 1: Counter with Actions
```tsx
'use client'
import { useReducer } from 'react'

type State = { count: number }
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

### Example 2: Todo List with Reducer
```tsx
'use client'
import { useReducer, useState } from 'react'

type Todo = { id: number; text: string; completed: boolean }
type State = { todos: Todo[] }
type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false }
        ]
      }
    case 'toggle':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case 'delete':
      return {
        todos: state.todos.filter(todo => todo.id !== action.id)
      }
    default:
      return state
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, { todos: [] })
  const [input, setInput] = useState('')
  
  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'add', text: input })
      setInput('')
    }
  }
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAdd}>Add</button>
      
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'toggle', id: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### useState vs useReducer:

| Use useState when: | Use useReducer when: |
|-------------------|---------------------|
| Simple state | Complex state logic |
| Few state updates | Many state updates |
| Independent values | Related values |
| Simple logic | Multiple actions |

---

## useActionState

**NEW in React 19!**

**What it does:** Manages form state with server actions

**When to use:** Forms that submit to server

### Basic Syntax:
```tsx
const [state, formAction, isPending] = useActionState(action, initialState)
```

### Example: Contact Form
```tsx
// app/contact/page.tsx
'use client'
import { useActionState } from 'react'
import { submitContact } from './actions'

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, {
    message: '',
    error: null
  })
  
  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </button>
      
      {state.message && <p className="success">{state.message}</p>}
      {state.error && <p className="error">{state.error}</p>}
    </form>
  )
}
```

```tsx
// app/contact/actions.ts
'use server'

export async function submitContact(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  
  try {
    // Send to database or email service
    await sendEmail({ name, email, message })
    
    return {
      message: 'Thank you! We will contact you soon.',
      error: null
    }
  } catch (error) {
    return {
      message: '',
      error: 'Failed to send message. Please try again.'
    }
  }
}
```

---

## useOptimistic

**NEW in React 19!**

**What it does:** Shows optimistic UI updates before server confirms

**When to use:** When you want instant feedback (like social media likes)

### Basic Syntax:
```tsx
const [optimisticState, setOptimisticState] = useOptimistic(currentState)
```

### Example: Like Button
```tsx
'use client'
import { useOptimistic } from 'react'
import { likePost } from './actions'

export default function LikeButton({ postId, initialLikes }: { 
  postId: string
  initialLikes: number 
}) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(initialLikes)
  
  const handleLike = async () => {
    // Show +1 immediately (optimistic)
    setOptimisticLikes(optimisticLikes + 1)
    
    // Send to server
    await likePost(postId)
  }
  
  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes} Likes
    </button>
  )
}
```

### Example: Comment List with Optimistic Updates
```tsx
'use client'
import { useOptimistic, useState } from 'react'
import { addComment } from './actions'

type Comment = { id: string; text: string; pending?: boolean }

export default function Comments({ initialComments }: { 
  initialComments: Comment[] 
}) {
  const [comments, setComments] = useState(initialComments)
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: Comment) => [...state, newComment]
  )
  
  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('comment') as string
    
    // Add optimistically
    addOptimisticComment({
      id: 'temp-' + Date.now(),
      text,
      pending: true
    })
    
    // Send to server
    const newComment = await addComment(text)
    setComments([...comments, newComment])
  }
  
  return (
    <div>
      <form action={handleSubmit}>
        <input name="comment" placeholder="Add comment" />
        <button type="submit">Post</button>
      </form>
      
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id} style={{ opacity: comment.pending ? 0.5 : 1 }}>
            {comment.text}
            {comment.pending && ' (Sending...)'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

**Continue to Part 2 for Effect Hooks, Ref Hooks, and more...**

---

## Quick Reference

### State Hooks Summary:

| Hook | Purpose | Use Case |
|------|---------|----------|
| `useState` | Simple state | Counters, inputs, toggles |
| `useReducer` | Complex state | Multiple related values |
| `useActionState` | Form state | Server-side forms |
| `useOptimistic` | Optimistic UI | Instant feedback |

### Common Patterns:

**1. Update state based on previous value:**
```tsx
setState(prev => prev + 1)
```

**2. Update object state:**
```tsx
setState({ ...state, field: newValue })
```

**3. Update array state:**
```tsx
// Add item
setState([...state, newItem])

// Remove item
setState(state.filter(item => item.id !== id))

// Update item
setState(state.map(item => 
  item.id === id ? { ...item, field: newValue } : item
))
```

---

Content was rephrased for compliance with licensing restrictions.

References:
[1] React Reference - https://react.dev/reference/react
[2] useState - https://react.dev/reference/react/useState
[3] useReducer - https://react.dev/reference/react/useReducer
[4] useActionState - https://react.dev/reference/react/useActionState
[5] useOptimistic - https://react.dev/reference/react/useOptimistic
