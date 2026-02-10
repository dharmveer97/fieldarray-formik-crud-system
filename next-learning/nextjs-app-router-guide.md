# Next.js App Router - Complete Guide (Simple English)

**Latest Version: 16.1.6 (February 2026)**

This guide explains Next.js App Router in simple, easy-to-understand English.

---

## Table of Contents
1. [What is Next.js App Router?](#what-is-nextjs-app-router)
2. [Server Components vs Client Components](#server-components-vs-client-components)
3. [Caching in Next.js](#caching-in-nextjs)
4. [Important Functions & APIs](#important-functions--apis)
5. [Client-Side Hooks](#client-side-hooks)
6. [Deploying to Vercel](#deploying-to-vercel)

---

## What is Next.js App Router?

**App Router** is the new way to build Next.js applications (introduced in 2022 with React 18).

### Key Features:
- **File-based routing** - Create files in the `app/` folder to make pages
- **Server Components by default** - Components run on the server (faster, better SEO)
- **Built-in caching** - Automatic performance optimization
- **Streaming** - Show parts of the page as they load

### Basic Structure:
```
app/
├── page.tsx          → Home page (/)
├── about/
│   └── page.tsx      → About page (/about)
└── blog/
    └── [slug]/
        └── page.tsx  → Dynamic blog page (/blog/my-post)
```

---

## Server Components vs Client Components

### Server Components (Default)
**What:** Components that run ONLY on the server

**Benefits:**
- Faster loading (less JavaScript sent to browser)
- Can directly access databases
- Better for SEO (search engines see full content)
- Secure (API keys stay on server)

**Example:**
```tsx
// app/posts/page.tsx
// This is a Server Component (default)
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts')
  const data = await posts.json()
  
  return (
    <div>
      {data.map(post => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
    </div>
  )
}
```

### Client Components
**What:** Components that run in the browser

**When to use:**
- Need user interactions (clicks, typing)
- Use browser features (localStorage, window)
- Use React hooks (useState, useEffect)

**Example:**
```tsx
'use client' // This line makes it a Client Component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

**Important Rule:** Once you use `'use client'`, all components inside it are also Client Components.

---

## Caching in Next.js

**Caching** = Storing data so you don't have to fetch it again (makes your app faster)

### Types of Caching:

#### 1. Server Caching
**Where:** On the server (Next.js server)
**What it stores:** Rendered pages and fetched data

#### 2. Client Caching
**Where:** In the user's browser
**What it stores:** Pages the user already visited

### How Caching Works:

```
User visits page → Check cache → Found? → Show cached version
                                ↓ Not found?
                                Fetch new data → Save to cache → Show page
```

---

## Important Functions & APIs

### 1. `cacheLife` - Control How Long Data is Cached

**What it does:** Tells Next.js how long to keep cached data

**Enable it first:**
```ts
// next.config.ts
const nextConfig = {
  cacheComponents: true, // Turn on caching
}
export default nextConfig
```

**Preset Profiles (Easy Options):**
```tsx
'use cache'
import { cacheLife } from 'next/cache'

export default async function Page() {
  cacheLife('seconds')  // Real-time data (stock prices)
  cacheLife('minutes')  // Social media feeds
  cacheLife('hours')    // Product inventory
  cacheLife('days')     // Blog posts
  cacheLife('weeks')    // Podcasts
  cacheLife('max')      // Rarely changes (legal pages)
}
```

**Custom Timing:**
```tsx
cacheLife({
  stale: 300,      // 5 minutes - browser can use cached data
  revalidate: 900, // 15 minutes - check for updates
  expire: 3600,    // 1 hour - delete old cache
})
```

---

### 2. `cacheTag` - Label Cached Data for Easy Updates

**What it does:** Adds a "tag" to cached data so you can update specific things

**Example:**
```tsx
'use cache'
import { cacheTag } from 'next/cache'

export async function getProduct(id: string) {
  cacheTag('products', `product-${id}`) // Add tags
  
  const product = await fetch(`/api/products/${id}`)
  return product.json()
}
```

**Update tagged cache:**
```tsx
'use server'
import { revalidateTag } from 'next/cache'

export async function updateProduct() {
  await saveProduct() // Save to database
  revalidateTag('products') // Clear cache for all products
}
```

---

### 3. `cookies` - Read/Write Browser Cookies

**What it does:** Access cookies (small data stored in browser)

**Example:**
```tsx
import { cookies } from 'next/headers'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')
  
  return token?.value
}
```

**Set a cookie:**
```tsx
'use server'
import { cookies } from 'next/headers'

export async function login() {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', 'abc123', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}
```

---

### 4. `headers` - Read Request Headers

**What it does:** Get information about the user's request (browser, language, etc.)

**Example:**
```tsx
import { headers } from 'next/headers'

export async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  
  return <div>Your browser: {userAgent}</div>
}
```

---

### 5. `connection` - Check Connection Status

**What it does:** See if the request is still active

**Example:**
```tsx
import { connection } from 'next/server'

export async function getData() {
  await connection() // Wait for connection
  // Fetch data...
}
```

---

### 6. `fetch` - Get Data from APIs

**What it does:** Fetch data from external sources (automatically cached)

**Basic usage:**
```tsx
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}
```

**Control caching:**
```tsx
// Cache forever
fetch('https://api.example.com/posts', { cache: 'force-cache' })

// Never cache
fetch('https://api.example.com/posts', { cache: 'no-store' })

// Cache for 1 hour
fetch('https://api.example.com/posts', { 
  next: { revalidate: 3600 } 
})
```

---

### 7. `revalidatePath` - Update Specific Pages

**What it does:** Clear cache for a specific page

**Example:**
```tsx
'use server'
import { revalidatePath } from 'next/cache'

export async function updateBlogPost() {
  await saveBlogPost()
  revalidatePath('/blog') // Refresh blog page
}
```

---

### 8. `revalidateTag` - Update Tagged Cache

**What it does:** Clear cache for all items with a specific tag

**Example:**
```tsx
'use server'
import { revalidateTag } from 'next/cache'

export async function updateProducts() {
  await saveProducts()
  revalidateTag('products') // Refresh all product caches
}
```

---

### 9. `redirect` - Send User to Another Page

**What it does:** Navigate user to a different URL

**Example:**
```tsx
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login') // Send to login page
  }
}
```

---

### 10. `notFound` - Show 404 Page

**What it does:** Display "page not found" error

**Example:**
```tsx
import { notFound } from 'next/navigation'

export async function getPost(id: string) {
  const post = await fetchPost(id)
  
  if (!post) {
    notFound() // Show 404 page
  }
  
  return post
}
```

---

## Client-Side Hooks

**Note:** These ONLY work in Client Components (with `'use client'`)

### 1. `useRouter` - Navigate Programmatically

**What it does:** Change pages in your code

**Example:**
```tsx
'use client'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await login()
    router.push('/dashboard') // Go to dashboard
  }
  
  return <button onClick={handleLogin}>Login</button>
}
```

**Methods:**
- `router.push('/path')` - Go to page
- `router.back()` - Go back
- `router.forward()` - Go forward
- `router.refresh()` - Reload current page

---

### 2. `usePathname` - Get Current URL Path

**What it does:** Returns the current page path

**Example:**
```tsx
'use client'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav>
      <a href="/" className={pathname === '/' ? 'active' : ''}>
        Home
      </a>
      <a href="/about" className={pathname === '/about' ? 'active' : ''}>
        About
      </a>
    </nav>
  )
}
```

---

### 3. `useSearchParams` - Get URL Query Parameters

**What it does:** Read URL parameters (like `?name=john&age=25`)

**Example:**
```tsx
'use client'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') // Get ?q=something
  
  return <div>Searching for: {query}</div>
}
```

**Important:** Wrap in `<Suspense>` to avoid errors:
```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  )
}
```

---

### 4. `useParams` - Get Dynamic Route Parameters

**What it does:** Get values from dynamic routes (like `/blog/[slug]`)

**Example:**
```tsx
'use client'
import { useParams } from 'next/navigation'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug // From /blog/my-post → "my-post"
  
  return <div>Post: {slug}</div>
}
```

---

## React's New `cache` Function

**What it does:** Prevents fetching the same data multiple times

**Example:**
```tsx
import { cache } from 'react'

// This function will only run once, even if called multiple times
export const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
})

// Both calls use the same cached result
const user1 = await getUser('123')
const user2 = await getUser('123') // Uses cached data
```

---

## Deploying to Vercel

### How It Works:

1. **Build Time:**
   - Next.js generates static pages
   - Caches data that doesn't change often
   - Creates optimized JavaScript bundles

2. **Request Time:**
   - User visits your site
   - Vercel serves cached pages (super fast)
   - Dynamic parts render on-demand

3. **Caching on Vercel:**
   - Static pages cached at CDN (edge locations worldwide)
   - Dynamic data cached on server
   - Automatic cache invalidation when you deploy

### Deployment Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "My Next.js app"
   git push
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"

3. **Automatic Deployments:**
   - Every push to `main` branch = new deployment
   - Preview deployments for pull requests
   - Instant rollbacks if needed

### Environment Variables:
```bash
# .env.local (local development)
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

Add to Vercel:
- Go to Project Settings → Environment Variables
- Add each variable
- Redeploy

---

## Complete Example: Blog with Caching

```tsx
// app/blog/page.tsx (Server Component)
import { cacheLife, cacheTag } from 'next/cache'

export default async function BlogPage() {
  'use cache'
  cacheLife('days') // Cache for 1 day
  cacheTag('blog-posts') // Tag for easy updates
  
  const posts = await fetch('https://api.example.com/posts')
  const data = await posts.json()
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

```tsx
// app/blog/[slug]/page.tsx (Dynamic Route)
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
  
  if (!post.ok) {
    notFound() // Show 404 if post doesn't exist
  }
  
  const data = await post.json()
  
  return (
    <article>
      <h1>{data.title}</h1>
      <div>{data.content}</div>
    </article>
  )
}
```

```tsx
// app/components/LikeButton.tsx (Client Component)
'use client'

import { useState } from 'react'

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0)
  
  const handleLike = async () => {
    await fetch(`/api/like/${postId}`, { method: 'POST' })
    setLikes(likes + 1)
  }
  
  return (
    <button onClick={handleLike}>
      ❤️ {likes} Likes
    </button>
  )
}
```

```tsx
// app/actions.ts (Server Action)
'use server'

import { revalidateTag } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // Save to database
  await savePost({ title, content })
  
  // Clear blog cache
  revalidateTag('blog-posts')
}
```

---

## Key Concepts Summary

### Server vs Client:
- **Server Components** = Run on server, faster, can access database
- **Client Components** = Run in browser, interactive, use hooks

### Caching:
- **Server Cache** = Stores rendered pages on server
- **Client Cache** = Stores visited pages in browser
- **Data Cache** = Stores fetched data

### Methods:
- **Static** = Built at build time (fast, cached)
- **Dynamic** = Built on each request (fresh data)

### Functions:
- `cacheLife` = Control cache duration
- `cacheTag` = Label cache for updates
- `revalidatePath` = Clear page cache
- `revalidateTag` = Clear tagged cache
- `cookies` = Read/write cookies
- `headers` = Read request info
- `fetch` = Get data from APIs

### Hooks (Client Only):
- `useRouter` = Navigate pages
- `usePathname` = Get current path
- `useSearchParams` = Get URL parameters
- `useParams` = Get route parameters

---

## Common Patterns

### 1. Fetch Data in Server Component:
```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data}</div>
}
```

### 2. Interactive Button in Client Component:
```tsx
'use client'
export default function Button() {
  return <button onClick={() => alert('Clicked!')}>Click</button>
}
```

### 3. Mix Server and Client:
```tsx
// Server Component
export default async function Page() {
  const data = await fetchData()
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton /> {/* Client Component inside */}
    </div>
  )
}
```

### 4. Dynamic Routes:
```tsx
// app/products/[id]/page.tsx
export default async function Product({ params }) {
  const product = await fetch(`/api/products/${params.id}`)
  return <div>{product.name}</div>
}
```

### 5. Form with Server Action:
```tsx
// app/contact/page.tsx
import { submitForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  )
}

// app/contact/actions.ts
'use server'
export async function submitForm(formData: FormData) {
  const email = formData.get('email')
  await saveToDatabase(email)
}
```

---

## Tips for Beginners

1. **Start with Server Components** - They're faster and simpler
2. **Only use Client Components when needed** - For interactivity
3. **Use preset cache profiles** - Don't worry about custom timing at first
4. **Let Next.js handle caching** - It's automatic and smart
5. **Test locally first** - Use `npm run dev` before deploying
6. **Read error messages carefully** - They tell you what's wrong
7. **Use TypeScript** - Catches errors before they happen

---

## Resources

- **Official Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Learn Next.js:** [nextjs.org/learn](https://nextjs.org/learn)
- **Deploy:** [vercel.com](https://vercel.com)

---

**Last Updated:** February 9, 2026  
**Next.js Version:** 16.1.6

Content was rephrased for compliance with licensing restrictions.

References:
[1] Directives: use cache - https://nextjs.org/docs/app/api-reference/directives/use-cache
[2] Functions: cacheTag - http://nextjs.org/docs/app/api-reference/functions/cacheTag
[3] Functions: cacheLife - https://nextjs.org/docs/app/api-reference/functions/cacheLife
[4] Functions: cookies - https://nextjs.org/docs/app/api-reference/functions/cookies
[5] Caching in Next.js - https://nextjs.org/docs/app/building-your-application/caching
