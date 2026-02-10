# React Guide Part 2: Effect & Ref Hooks

## Effect Hooks

Effect hooks let you perform side effects (actions outside React) in your components.

---

## useEffect

**What it does:** Runs code after component renders (side effects)

**When to use:** Data fetching, subscriptions, DOM manipulation, timers

### Basic Syntax:
```tsx
useEffect(() => {
  // Your code here
  return () => {
    // Cleanup (optional)
  }
}, [dependencies])
```

### Example 1: Document Title
```tsx
'use client'
import { useEffect, useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // Update document title
    document.title = `Count: ${count}`
  }, [count]) // Runs when count changes
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Example 2: Fetch Data
```tsx
'use client'
import { useEffect, useState } from 'react'

type Post = { id: number; title: string }

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    
    fetchPosts()
  }, []) // Empty array = run once on mount
  
  if (loading) return <div>Loading...</div>
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Example 3: Timer with Cleanup
```tsx
'use client'
import { useEffect, useState } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    
    // Cleanup function
    return () => clearInterval(interval)
  }, []) // Run once
  
  return <div>Seconds: {seconds}</div>
}
```

### Example 4: Event Listener
```tsx
'use client'
import { useEffect, useState } from 'react'

export default function WindowSize() {
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    
    // Set initial width
    handleResize()
    
    // Add listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return <div>Window width: {width}px</div>
}
```

### Example 5: Subscription
```tsx
'use client'
import { useEffect, useState } from 'react'

export default function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([])
  
  useEffect(() => {
    // Connect to chat
    const connection = connectToChat(roomId)
    
    connection.on('message', (msg: string) => {
      setMessages(prev => [...prev, msg])
    })
    
    // Cleanup: disconnect
    return () => connection.disconnect()
  }, [roomId]) // Re-run when roomId changes
  
  return (
    <ul>
      {messages.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  )
}
```

### Dependency Array Rules:

```tsx
// 1. No dependencies = run on every render
useEffect(() => {
  console.log('Runs every render')
})

// 2. Empty array = run once on mount
useEffect(() => {
  console.log('Runs once')
}, [])

// 3. With dependencies = run when dependencies change
useEffect(() => {
  console.log('Runs when count changes')
}, [count])

// 4. Multiple dependencies
useEffect(() => {
  console.log('Runs when count OR name changes')
}, [count, name])
```

---

## useLayoutEffect

**What it does:** Like useEffect, but runs BEFORE browser paints

**When to use:** When you need to measure or modify DOM before user sees it

### Example: Measure Element
```tsx
'use client'
import { useLayoutEffect, useRef, useState } from 'react'

export default function MeasureElement() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  
  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight)
    }
  }, [])
  
  return (
    <div>
      <div ref={ref} style={{ padding: '20px', background: '#eee' }}>
        This is some content
      </div>
      <p>Height: {height}px</p>
    </div>
  )
}
```

### Example: Tooltip Positioning
```tsx
'use client'
import { useLayoutEffect, useRef, useState } from 'react'

export default function Tooltip({ text }: { text: string }) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      
      // Position tooltip above element
      setPosition({
        top: rect.top - 40,
        left: rect.left + rect.width / 2
      })
    }
  }, [])
  
  return (
    <div ref={tooltipRef} style={{ position: 'relative' }}>
      {text}
      <div style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        background: 'black',
        color: 'white',
        padding: '5px'
      }}>
        Tooltip
      </div>
    </div>
  )
}
```

---

## useInsertionEffect

**What it does:** Runs BEFORE any DOM mutations (for CSS-in-JS libraries)

**When to use:** Rarely - only for CSS-in-JS library authors

### Example: Dynamic CSS
```tsx
'use client'
import { useInsertionEffect } from 'react'

export default function StyledComponent() {
  useInsertionEffect(() => {
    // Insert CSS before DOM updates
    const style = document.createElement('style')
    style.textContent = '.dynamic { color: red; }'
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  return <div className="dynamic">Styled text</div>
}
```

---

## useEffectEvent

**NEW in React 19!**

**What it does:** Creates stable event handler that doesn't trigger re-runs

**When to use:** When you need latest props/state without re-running effect

### Example: Analytics
```tsx
'use client'
import { useEffect, useEffectEvent } from 'react'

export default function Page({ url }: { url: string }) {
  const onVisit = useEffectEvent((visitedUrl: string) => {
    // This can read latest props without causing effect to re-run
    logAnalytics(visitedUrl)
  })
  
  useEffect(() => {
    onVisit(url)
  }, [url]) // Only re-run when url changes
  
  return <div>Page: {url}</div>
}
```

---

## Ref Hooks

Ref hooks let you reference values that don't trigger re-renders.

---

## useRef

**What it does:** Stores a value that persists between renders (doesn't cause re-render)

**When to use:** DOM elements, timers, previous values, any mutable value

### Example 1: Access DOM Element
```tsx
'use client'
import { useRef } from 'react'

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleFocus = () => {
    inputRef.current?.focus()
  }
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  )
}
```

### Example 2: Store Previous Value
```tsx
'use client'
import { useRef, useEffect, useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number>()
  
  useEffect(() => {
    prevCountRef.current = count
  }, [count])
  
  const prevCount = prevCountRef.current
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

### Example 3: Store Timer ID
```tsx
'use client'
import { useRef, useState } from 'react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    }
  }
  
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  
  const reset = () => {
    stop()
    setTime(0)
  }
  
  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### Example 4: Video Player Control
```tsx
'use client'
import { useRef } from 'react'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const play = () => videoRef.current?.play()
  const pause = () => videoRef.current?.pause()
  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }
  
  return (
    <div>
      <video ref={videoRef} src="/video.mp4" width="400" />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  )
}
```

### useState vs useRef:

| useState | useRef |
|----------|--------|
| Triggers re-render | No re-render |
| For UI data | For non-UI data |
| Immutable updates | Mutable value |
| Async updates | Sync updates |

---

## useImperativeHandle

**What it does:** Customizes the ref value exposed to parent

**When to use:** When you want to control what parent can access

### Example: Custom Input Component
```tsx
'use client'
import { useRef, useImperativeHandle, forwardRef } from 'react'

// Define what parent can access
type CustomInputHandle = {
  focus: () => void
  clear: () => void
}

const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    }))
    
    return <input ref={inputRef} {...props} />
  }
)

// Parent component
export default function Form() {
  const inputRef = useRef<CustomInputHandle>(null)
  
  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Enter text" />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
      <button onClick={() => inputRef.current?.clear()}>Clear</button>
    </div>
  )
}
```

---

## Quick Reference

### Effect Hooks Summary:

| Hook | When it runs | Use case |
|------|-------------|----------|
| `useEffect` | After render | Data fetching, subscriptions |
| `useLayoutEffect` | Before paint | DOM measurements |
| `useInsertionEffect` | Before DOM mutations | CSS-in-JS |
| `useEffectEvent` | Stable handler | Event handlers in effects |

### Ref Hooks Summary:

| Hook | Purpose | Use case |
|------|---------|----------|
| `useRef` | Store mutable value | DOM refs, timers, previous values |
| `useImperativeHandle` | Customize ref | Expose specific methods to parent |

### Common Patterns:

**1. Cleanup in useEffect:**
```tsx
useEffect(() => {
  const id = setInterval(() => {}, 1000)
  return () => clearInterval(id) // Cleanup
}, [])
```

**2. Conditional effect:**
```tsx
useEffect(() => {
  if (condition) {
    // Do something
  }
}, [condition])
```

**3. Access DOM element:**
```tsx
const ref = useRef<HTMLDivElement>(null)
useEffect(() => {
  console.log(ref.current?.offsetHeight)
}, [])
```

---

Content was rephrased for compliance with licensing restrictions.

References:
[1] useEffect - https://react.dev/reference/react/useEffect
[2] useLayoutEffect - https://react.dev/reference/react/useLayoutEffect
[3] useRef - https://react.dev/reference/react/useRef
[4] useImperativeHandle - https://react.dev/reference/react/useImperativeHandle
