# React & Next.js Learning Path

A comprehensive, structured collection of learning materials for mastering React 19 and Next.js 16. This repository contains detailed documentation, practical examples, and best practices for modern frontend development.

## 📚 What's Inside

### React Learning (`/react-learning`)
Complete coverage of **React 19.2.3** with 100+ examples:

- **19 React Hooks** - All hooks from basic to advanced
- **6 React APIs** - Core APIs including new React 19 features
- **4 React Components** - Fragment, Suspense, StrictMode, Profiler
- **16 React-DOM APIs** - Browser-specific features and SSR

### Next.js Learning (`/next-learning`)
Modern **Next.js 16.1.6** App Router guide:

- Server Components vs Client Components
- Caching strategies and optimization
- Routing and navigation patterns
- Deployment best practices

## 🎯 Who Is This For?

- **Beginners** learning React from scratch
- **Intermediate developers** upgrading to React 19
- **Next.js developers** transitioning to App Router
- **Anyone** wanting a comprehensive reference guide

## 📖 Documentation Structure

```
react-learning/
├── INDEX.md                          # Complete topic index
├── 01-react-core/
│   ├── 01-state-hooks.md            # useState, useReducer, useActionState, useOptimistic
│   ├── 02-effect-ref-hooks.md       # useEffect, useLayoutEffect, useRef, useImperativeHandle
│   ├── 03-performance-hooks.md      # useMemo, useCallback, useTransition, useDeferredValue
│   ├── 04-context-apis.md           # useContext, useId, cache, lazy, memo, use
│   └── 05-components-summary.md     # Fragment, Suspense, StrictMode, Profiler
└── 02-react-dom/
    └── react-dom-complete-guide.md  # All React-DOM features

next-learning/
└── nextjs-app-router-guide.md       # Complete App Router guide
```

## 🆕 React 19 New Features Covered

### New Hooks
- `useActionState` - Form state management with server actions
- `useOptimistic` - Optimistic UI updates
- `useFormStatus` - Form submission status tracking
- `useEffectEvent` - Stable event handlers in effects

### New APIs
- `cache` - Server-side function memoization
- `use` - Read Promises and Context values

### New React-DOM APIs
- Resource preloading: `preconnect`, `prefetchDNS`, `preload`, `preloadModule`
- Resource initialization: `preinit`, `preinitModule`
- Static generation: `prerender`, `prerenderToNodeStream`

## 🚀 Quick Start

### For React Learners

1. **Beginners** - Start here:
   - `01-state-hooks.md` → Learn `useState` and `useReducer`
   - `02-effect-ref-hooks.md` → Learn `useEffect` and `useRef`
   - `05-components-summary.md` → Learn core components

2. **Intermediate** - Continue with:
   - `03-performance-hooks.md` → Optimize with `useMemo` and `useCallback`
   - `04-context-apis.md` → Share data with Context
   - `react-dom-complete-guide.md` → Browser-specific features

3. **Advanced** - Master React 19:
   - New hooks: `useActionState`, `useOptimistic`, `useFormStatus`
   - New APIs: `cache`, `use`
   - Server Components and SSR

### For Next.js Learners

Start with `nextjs-app-router-guide.md` to learn:
- App Router fundamentals
- Server vs Client Components
- Caching strategies
- Deployment to Vercel

## 📊 Coverage Statistics

- **Total Hooks:** 19 (including 4 new in React 19)
- **Total APIs:** 6 (including 2 new in React 19)
- **Total Components:** 4
- **Total React-DOM APIs:** 16 (including 8 new in React 19)
- **Total Examples:** 100+
- **Documentation Files:** 8

## 🎓 Learning Path

### Level 1: Fundamentals
- [ ] `useState` - Manage component state
- [ ] `useEffect` - Handle side effects
- [ ] `useRef` - Access DOM elements
- [ ] Basic components (Fragment, Suspense)

### Level 2: Intermediate
- [ ] `useReducer` - Complex state management
- [ ] `useContext` - Share data globally
- [ ] `useMemo` & `useCallback` - Performance optimization
- [ ] `lazy` & `memo` - Code splitting and memoization

### Level 3: Advanced
- [ ] `useActionState` - Server actions (React 19)
- [ ] `useOptimistic` - Optimistic updates (React 19)
- [ ] `useTransition` - Concurrent rendering
- [ ] `use` API - Read Promises (React 19)
- [ ] `cache` API - Server memoization (React 19)

### Level 4: Next.js
- [ ] App Router basics
- [ ] Server Components
- [ ] Caching strategies
- [ ] Production deployment

## 🔍 Quick Reference

### Need to manage state?
- Simple value → `useState`
- Complex logic → `useReducer`
- Form with server → `useActionState`
- Optimistic UI → `useOptimistic`

### Need performance optimization?
- Cache value → `useMemo`
- Cache function → `useCallback`
- Cache component → `memo`
- Non-blocking update → `useTransition`

### Need side effects?
- After render → `useEffect`
- Before paint → `useLayoutEffect`
- Stable handler → `useEffectEvent`

### Need to share data?
- Between components → `useContext`
- Server-side → `cache`

## 💡 Key Features

- **Simple English** - No complex jargon, easy to understand
- **Practical Examples** - Real-world code you can use
- **TypeScript Support** - All examples include TypeScript
- **React 19 Ready** - Latest features and best practices
- **Next.js 16 Compatible** - Modern App Router patterns
- **Comprehensive** - 100% coverage of React & React-DOM APIs

## 📚 External Resources

- [React Official Docs](https://react.dev)
- [Next.js Official Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://typescriptlang.org)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## 🤝 Contributing

This is a personal learning repository, but suggestions and corrections are welcome! Feel free to open an issue if you find any errors or have suggestions for improvement.

## 📝 License

This repository is for educational purposes. Feel free to use these materials for your own learning.

---

**Last Updated:** February 10, 2026  
**React Version:** 19.2.3  
**Next.js Version:** 16.1.6

**Status:** ✅ Complete coverage of React 19 & Next.js 16 App Router
