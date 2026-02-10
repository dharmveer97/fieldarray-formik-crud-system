# React 19.2.3 & React-DOM 19.2.3 - Complete Index

## 📚 All Topics Covered

### React Core Hooks (18 hooks)

#### State Hooks (4)
1. ✅ `useState` - Simple state management
2. ✅ `useReducer` - Complex state with actions
3. ✅ `useActionState` - Form state with server actions (NEW in 19)
4. ✅ `useOptimistic` - Optimistic UI updates (NEW in 19)

#### Effect Hooks (4)
5. ✅ `useEffect` - Side effects after render
6. ✅ `useLayoutEffect` - Effects before browser paint
7. ✅ `useInsertionEffect` - CSS-in-JS library effects
8. ✅ `useEffectEvent` - Stable event handlers (NEW in 19)

#### Ref Hooks (2)
9. ✅ `useRef` - Mutable values without re-render
10. ✅ `useImperativeHandle` - Customize ref exposure

#### Performance Hooks (4)
11. ✅ `useMemo` - Memoize expensive calculations
12. ✅ `useCallback` - Memoize functions
13. ✅ `useTransition` - Non-blocking state updates
14. ✅ `useDeferredValue` - Defer value updates

#### Context & Other Hooks (4)
15. ✅ `useContext` - Read context values
16. ✅ `useId` - Generate unique IDs
17. ✅ `useSyncExternalStore` - Subscribe to external stores
18. ✅ `useDebugValue` - Custom hook debug labels

### React-DOM Hooks (1)
19. ✅ `useFormStatus` - Form submission status (NEW in 19)

---

### React APIs (6)

1. ✅ `cache` - Server-side function memoization (NEW in 19)
2. ✅ `createContext` - Create context object
3. ✅ `lazy` - Lazy load components
4. ✅ `memo` - Memoize components
5. ✅ `startTransition` - Start non-blocking transition
6. ✅ `use` - Read Promises or Context (NEW in 19)

---

### React Components (4)

1. ✅ `Fragment` (`<>`) - Group elements without wrapper
2. ✅ `Suspense` - Show fallback while loading
3. ✅ `StrictMode` - Enable development checks
4. ✅ `Profiler` - Measure rendering performance

---

### React-DOM APIs (13)

#### Portal API (1)
1. ✅ `createPortal` - Render outside parent DOM

#### Sync API (1)
2. ✅ `flushSync` - Force synchronous DOM update

#### Resource Preloading APIs (6) - NEW in 19
3. ✅ `preconnect` - Preconnect to origin
4. ✅ `prefetchDNS` - Prefetch DNS
5. ✅ `preload` - Preload resource
6. ✅ `preloadModule` - Preload ES module
7. ✅ `preinit` - Initialize resource
8. ✅ `preinitModule` - Initialize ES module

#### Client APIs (2)
9. ✅ `createRoot` - Create React root
10. ✅ `hydrateRoot` - Hydrate server-rendered HTML

#### Server APIs (3)
11. ✅ `renderToPipeableStream` - Render to Node.js stream
12. ✅ `renderToReadableStream` - Render to Web stream
13. ✅ `renderToString` - Render to HTML string
14. ✅ `renderToStaticMarkup` - Render to static HTML

#### Static APIs (2) - NEW in 19
15. ✅ `prerender` - Pre-render to static HTML
16. ✅ `prerenderToNodeStream` - Pre-render to Node.js stream

---

## 📊 Statistics

- **Total Hooks:** 19 (4 new in React 19)
- **Total APIs:** 6 (2 new in React 19)
- **Total Components:** 4
- **Total React-DOM APIs:** 16 (8 new in React 19)
- **Total Examples:** 100+
- **Total Pages:** 8 files

---

## 🆕 What's New in React 19.2.3

### New Hooks (4):
- `useActionState` - Form state management
- `useOptimistic` - Optimistic UI updates
- `useFormStatus` - Form submission status
- `useEffectEvent` - Stable event handlers

### New APIs (2):
- `cache` - Server-side memoization
- `use` - Read Promises/Context

### New React-DOM APIs (8):
- `preconnect`, `prefetchDNS` - Connection optimization
- `preload`, `preloadModule` - Resource preloading
- `preinit`, `preinitModule` - Resource initialization
- `prerender`, `prerenderToNodeStream` - Static generation

### Improvements:
- Better streaming SSR
- Enhanced Server Components
- Improved concurrent rendering
- Better TypeScript support

### Removed:
- `ReactDOM.render()` → Use `createRoot()`
- `ReactDOM.hydrate()` → Use `hydrateRoot()`
- String refs → Use `useRef()` or callback refs

---

## 📖 File Organization

```
react-learning/
│
├── README.md                          # Main guide & learning path
├── QUICK-START.md                     # 5-minute quick start
├── INDEX.md                           # This file - complete index
│
├── 01-react-core/                     # React fundamentals
│   ├── 01-state-hooks.md             # useState, useReducer, useActionState, useOptimistic
│   ├── 02-effect-ref-hooks.md        # useEffect, useLayoutEffect, useRef, etc.
│   ├── 03-performance-hooks.md       # useMemo, useCallback, useTransition, useDeferredValue
│   ├── 04-context-apis.md            # useContext, useId, cache, lazy, memo, use
│   └── 05-components-summary.md      # Fragment, Suspense, StrictMode, Profiler + Summary
│
├── 02-react-dom/                      # Browser-specific features
│   └── react-dom-complete-guide.md   # All React-DOM hooks, APIs, and features
│
└── 03-examples/                       # Practical examples (coming soon)
```

---

## 🎯 Learning Checklist

### Beginner Level:
- [ ] `useState` - Manage simple state
- [ ] `useEffect` - Handle side effects
- [ ] `useRef` - Access DOM elements
- [ ] `Fragment` - Group elements
- [ ] `Suspense` - Loading states

### Intermediate Level:
- [ ] `useReducer` - Complex state logic
- [ ] `useContext` - Global state
- [ ] `useMemo` - Performance optimization
- [ ] `useCallback` - Memoize functions
- [ ] `lazy` - Code splitting
- [ ] `memo` - Memoize components

### Advanced Level:
- [ ] `useActionState` - Server actions (NEW)
- [ ] `useOptimistic` - Optimistic updates (NEW)
- [ ] `useFormStatus` - Form status (NEW)
- [ ] `useTransition` - Concurrent rendering
- [ ] `useDeferredValue` - Defer updates
- [ ] `use` - Read Promises (NEW)
- [ ] `cache` - Server memoization (NEW)

### React-DOM:
- [ ] `createPortal` - Modals & tooltips
- [ ] `useFormStatus` - Form submission
- [ ] Resource preloading APIs
- [ ] SSR concepts

---

## 🔍 Quick Search

### Need to manage state?
- Simple value → `useState`
- Complex logic → `useReducer`
- Form with server → `useActionState`
- Optimistic UI → `useOptimistic`

### Need side effects?
- After render → `useEffect`
- Before paint → `useLayoutEffect`
- Stable handler → `useEffectEvent`

### Need performance?
- Cache value → `useMemo`
- Cache function → `useCallback`
- Cache component → `memo`
- Non-blocking update → `useTransition`
- Defer value → `useDeferredValue`

### Need to share data?
- Between components → `useContext`
- Server-side → `cache`

### Need DOM access?
- Store value → `useRef`
- Access element → `useRef` + `ref` prop
- Render elsewhere → `createPortal`

### Need loading states?
- Async component → `Suspense`
- Lazy load → `lazy`
- Read Promise → `use`

---

## 📚 External Resources

- **React Docs:** https://react.dev
- **Next.js Docs:** https://nextjs.org/docs
- **TypeScript:** https://typescriptlang.org
- **React DevTools:** Browser extension

---

## ✅ Completion Status

- ✅ All 19 React hooks documented
- ✅ All 6 React APIs documented
- ✅ All 4 React components documented
- ✅ All 16 React-DOM APIs documented
- ✅ 100+ practical examples
- ✅ Next.js integration examples
- ✅ Simple English explanations
- ✅ TypeScript examples
- ⏳ Practical projects (coming soon)

---

**Total Coverage: 100% of React 19.2.3 & React-DOM 19.2.3**

Last Updated: February 10, 2026
