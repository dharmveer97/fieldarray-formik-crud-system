# React Guide Part 3: Performance Hooks

Performance hooks help optimize your app by preventing unnecessary work.

---

## useMemo

**What it does:** Memoizes (caches) expensive calculations

**When to use:** When calculation is slow and inputs don't change often

### Basic Syntax:
```tsx
const memoizedValue = useMemo(() => expensiveCalculation(), [dependencies])
```

### Example 1: Expensive Calculation
```tsx
'use client'
import { useMemo, useState } from 'react'

function expensiveCalculation(num: number) {
  console.log('Calculating...')
  let result = 0
  for (let i = 0; i < 1000000000; i++) {
    result += num
  }
  return result
}

export default function Calculator() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState(5)
  
  // Only recalculate when input changes, not when count changes
  const result = useMemo(() => {
    return expensiveCalculation(input)
  }, [input])
  
  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Result: {result}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
```

### Example 2: Filter Large List
```tsx
'use client'
import { useMemo, useState } from 'react'

type Item = { id: number; name: string; category: string }

export default function FilteredList({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('')
  
  // Only filter when items or filter changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...')
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter])
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Example 3: Sort Data
```tsx
'use client'
import { useMemo, useState } from 'react'

type User = { id: number; name: string; age: number }

export default function SortedUsers({ users }: { users: User[] }) {
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name')
  
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return a.age - b.age
    })
  }, [users, sortBy])
  
  return (
    <div>
      <button onClick={() => setSortBy('name')}>Sort by Name</button>
      <button onClick={() => setSortBy('age')}>Sort by Age</button>
      
      <ul>
        {sortedUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.age} years
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## useCallback

**What it does:** Memoizes (caches) functions

**When to use:** When passing functions to child components to prevent re-renders

### Basic Syntax:
```tsx
const memoizedCallback = useCallback(() => {
  // function body
}, [dependencies])
```

### Example 1: Prevent Child Re-render
```tsx
'use client'
import { useCallback, useState, memo } from 'react'

// Child component (memoized)
const Button = memo(({ onClick, label }: {
  onClick: () => void
  label: string
}) => {
  console.log(`Rendering ${label}`)
  return <button onClick={onClick}>{label}</button>
})

export default function Parent() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)
  
  // Without useCallback, this creates new function on every render
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // No dependencies = function never changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      
      {/* Button only re-renders when handleIncrement changes (never) */}
      <Button onClick={handleIncrement} label="Increment" />
      
      {/* This button always re-renders */}
      <button onClick={() => setOther(other + 1)}>
        Other
      </button>
    </div>
  )
}
```

### Example 2: Event Handler with Dependencies
```tsx
'use client'
import { useCallback, useState } from 'react'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  
  // Recreate function only when query changes
  const handleSearch = useCallback(async () => {
    const res = await fetch(`/api/search?q=${query}`)
    const data = await res.json()
    setResults(data)
  }, [query])
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Example 3: Debounced Function
```tsx
'use client'
import { useCallback, useEffect, useState } from 'react'

export default function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return
    const res = await fetch(`/api/search?q=${searchQuery}`)
    const data = await res.json()
    setResults(data)
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query)
    }, 500) // Wait 500ms after user stops typing
    
    return () => clearTimeout(timer)
  }, [query, search])
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  )
}
```

---

## useTransition

**What it does:** Marks state updates as non-urgent (low priority)

**When to use:** When update is slow and you don't want to block UI

### Basic Syntax:
```tsx
const [isPending, startTransition] = useTransition()
```

### Example 1: Slow List Update
```tsx
'use client'
import { useState, useTransition } from 'react'

export default function SearchList() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  
  const handleChange = (value: string) => {
    // Update input immediately (urgent)
    setQuery(value)
    
    // Update list in background (non-urgent)
    startTransition(() => {
      const filtered = hugeList.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      setList(filtered)
    })
  }
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const hugeList = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)
```

### Example 2: Tab Switching
```tsx
'use client'
import { useState, useTransition } from 'react'

export default function Tabs() {
  const [tab, setTab] = useState('home')
  const [isPending, startTransition] = useTransition()
  
  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setTab(nextTab)
    })
  }
  
  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('posts')}>Posts</button>
      <button onClick={() => selectTab('contact')}>Contact</button>
      
      {isPending && <p>Loading...</p>}
      
      {tab === 'home' && <HomePage />}
      {tab === 'posts' && <PostsPage />}
      {tab === 'contact' && <ContactPage />}
    </div>
  )
}
```

---

## useDeferredValue

**What it does:** Defers updating a value until more urgent updates finish

**When to use:** When you want to keep UI responsive during slow updates

### Basic Syntax:
```tsx
const deferredValue = useDeferredValue(value)
```

### Example 1: Deferred Search
```tsx
'use client'
import { useState, useDeferredValue, memo } from 'react'

// Slow component
const SlowList = memo(({ query }: { query: string }) => {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)
  const filtered = items.filter(item => item.includes(query))
  
  return (
    <ul>
      {filtered.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
})

export default function Search() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {/* Input updates immediately, list updates when possible */}
      <SlowList query={deferredQuery} />
    </div>
  )
}
```

### Example 2: Show Stale Content
```tsx
'use client'
import { useState, useDeferredValue } from 'react'

export default function Results() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  
  const isStale = query !== deferredQuery
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SearchResults query={deferredQuery} />
      </div>
    </div>
  )
}
```

---

## Quick Reference

### Performance Hooks Summary:

| Hook | Purpose | Use Case |
|------|---------|----------|
| `useMemo` | Cache calculated value | Expensive calculations |
| `useCallback` | Cache function | Prevent child re-renders |
| `useTransition` | Mark updates as low priority | Slow state updates |
| `useDeferredValue` | Defer value updates | Keep UI responsive |

### When to Use:

**useMemo:**
- Expensive calculations
- Filtering/sorting large lists
- Creating objects/arrays passed to children

**useCallback:**
- Functions passed to memoized children
- Functions in dependency arrays
- Event handlers passed as props

**useTransition:**
- Slow state updates
- Tab switching
- Route changes

**useDeferredValue:**
- Search/filter inputs
- Real-time updates
- Keeping input responsive

### Common Patterns:

**1. Memoize expensive calculation:**
```tsx
const result = useMemo(() => {
  return expensiveFunction(input)
}, [input])
```

**2. Memoize function for child:**
```tsx
const handleClick = useCallback(() => {
  doSomething()
}, [])
```

**3. Non-blocking update:**
```tsx
startTransition(() => {
  setState(newValue)
})
```

**4. Defer value:**
```tsx
const deferredValue = useDeferredValue(value)
```

### Performance Tips:

1. **Don't optimize prematurely** - Only use these when you have performance issues
2. **Profile first** - Use React DevTools to find slow components
3. **useMemo/useCallback have cost** - Only use for expensive operations
4. **Memoize children** - Use `memo()` with `useCallback`
5. **Dependencies matter** - Wrong dependencies = bugs or no optimization

---

Content was rephrased for compliance with licensing restrictions.

References:
[1] useMemo - https://react.dev/reference/react/useMemo
[2] useCallback - https://react.dev/reference/react/useCallback
[3] useTransition - https://react.dev/reference/react/useTransition
[4] useDeferredValue - https://react.dev/reference/react/useDeferredValue
