# JWT Authentication Flow - Industry Standard Implementation

## Problem We Fixed

**Before:** On page refresh (F5), users would briefly see the login page flash before being redirected to the protected page. **Very annoying!**

**Why it happened:**

1. App loads → Component renders → `ProtectedRoute` shows spinner (looks like login page)
2. Auth check happens asynchronously → After 100ms-500ms, the page loads
3. Result: **Login page flash** ⚠️

---

## Solution: Synchronous Token Check

### How Industry Leaders Do It (Netflix, Google, GitHub, Figma, Slack, etc.)

```
1. App loads
2. Check localStorage for JWT token SYNCHRONOUSLY (immediately, no waiting)
3. If token exists:
   ✅ Show blank/skeleton screen (user sees nothing, no flash)
   ✅ Validate token with server in background
   ✅ Once validation succeeds, show the actual page
4. If no token:
   ✅ Show login page immediately (no blank screen)
```

---

## Our Implementation

### Step 1: useAuth Hook (Synchronous Check)

```typescript
const [isHydrated, setIsHydrated] = useState(false)
const [hasToken, setHasToken] = useState(false)

useEffect(() => {
  // This runs IMMEDIATELY on mount
  const token = authApi.getToken()  // Synchronous localStorage read
  setHasToken(!!token)
  setIsHydrated(true)  // Mark as ready
}, [])

// Only fetch /auth/me if token exists
const { data: user, isLoading } = useQuery({
  enabled: isHydrated && hasToken,  // Don't fetch if no token
  // ...
})
```

**Key insight:** `getToken()` is synchronous - it just reads localStorage, no async wait!

### Step 2: ProtectedRoute (Show Blank Screen, Not Login)

```typescript
// While auth is being validated, show BLANK screen (not spinner)
if (isLoading) {
  return <div className="min-h-screen bg-[var(--color-bg)]" />  // Blank!
}

// If no token after check, show login (redirect happens)
if (!user) {
  return null  // useEffect will redirect to /login
}

// User valid, show page
return <>{children}</>
```

**Why blank screen?**

- User doesn't notice 100-200ms blank screen
- They DEFINITELY notice login page flashing
- Screen color matches the app → seamless

---

## Auth Flow Diagram

### Before (Buggy)

```
Page Refresh
    ↓
Component Mounts
    ↓
ProtectedRoute: isLoading=true
    ↓
Show Spinner ⚠️ (LOOKS LIKE LOGIN PAGE!)
    ↓
Auth Check Completes
    ↓
Show Page
```

### After (Fixed) ✅

```
Page Refresh
    ↓
Check localStorage for token (synchronous)
    ↓
Token exists? Set isHydrated=true
    ↓
Show BLANK screen (100% seamless)
    ↓
Validate token with server in background
    ↓
Token valid? Show Page
    ↓
No token? Show Login Page
```

---

## How It Works in Code

**Scenario 1: User has valid token (normal case)**

```
1. F5 → Page loads
2. useAuth checks localStorage → finds token
3. ProtectedRoute shows blank screen (user sees nothing, < 200ms)
4. Query fetches /auth/me → validation succeeds
5. Page renders → no flash! ✅
```

**Scenario 2: User has no token**

```
1. F5 → Page loads
2. useAuth checks localStorage → no token found
3. ProtectedRoute returns null
4. useEffect detects no user → redirects to /login
5. Login page shows immediately ✅
```

**Scenario 3: User has invalid/expired token**

```
1. F5 → Page loads
2. useAuth checks localStorage → finds token
3. ProtectedRoute shows blank screen
4. Query fetches /auth/me → returns 401
5. useAuth clears token
6. ProtectedRoute detects no user → redirects to /login
7. Login page shows ✅
```

---

## Key Differences from Before

| Aspect | Before | After |
|--------|--------|-------|
| Token check | Async in useEffect | Sync in useEffect |
| While loading | Show spinner | Show blank screen |
| Flash on refresh | YES ❌ | NO ✅ |
| UX Feel | Unprofessional | Professional |
| Load time perception | Slower (visible spinner) | Faster (invisible wait) |

---

## Production Best Practices

✅ **What we do correctly:**

1. **Never render auth page if token exists** - Check token first
2. **Synchronous token check** - Don't wait for async operations
3. **Show blank screen during validation** - Not spinner or login
4. **Preserve token in localStorage** - Survives page refresh
5. **Cache user data** - Don't refetch /auth/me on every render
6. **Only validate if needed** - Skip validation if cache is fresh

✅ **Security:**

1. JWT stored in localStorage (accessible from JS, but acceptable for web apps)
2. Token included in Authorization header
3. Server validates token on each request
4. Expired tokens cause re-login

---

## Companies Using Similar Approaches

- **Netflix** - Blank screen while token validates
- **Figma** - Seamless auth with no flash
- **GitHub** - Immediate redirect if no token
- **Slack** - Skeleton screens while loading
- **Google** - Checks localStorage before redirecting
