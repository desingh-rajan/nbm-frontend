# 🔐 Admin Login System - Setup Guide

## ✅ What's Been Created

### 1. **API Client** (`src/lib/api.ts`)

- Handles all backend communication
- Automatic token management
- Type-safe API calls

### 2. **Authentication Context** (`src/contexts/AuthContext.tsx`)

- Global user state management
- Login/logout functions
- Role checking (superadmin, admin, user)

### 3. **Login Page** (`/login`)

- Clean, professional login form
- Error handling
- Development credentials display
- Responsive design

### 4. **Admin Dashboard** (`/admin`)

- Protected route (requires login)
- User info display
- Quick stats and actions
- Sidebar navigation

### 5. **User Management** (`/admin/users`)

- Superadmin only
- Create/delete users
- View all users in table
- Assign roles (admin/user)

### 6. **Protected Routes**

- `ProtectedRoute` component
- Automatic redirect to /login if not authenticated
- Role-based access control

---

## 🚀 How to Test Locally

### Step 1: Start Your Backend

```bash
# Make sure your backend is running on http://localhost:8000
cd /path/to/backend
npm run dev
```

### Step 2: Start Frontend

```bash
# In your nbm-frontend directory
npm run dev
```

### Step 3: Visit Login Page

```
http://localhost:3000/login
```

### Step 4: Test Login

Use the development credentials from your backend:

**Superadmin:**

- Email: `dev-admin@localhost`
- Password: (from your backend .env SUPERADMIN_PASSWORD)

**Alpha User:**

- Email: `alpha@localhost`
- Password: (from your backend .env ALPHA_PASSWORD)

---

## 🎯 User Roles & Permissions

### **Superadmin**

- ✅ Full access to everything
- ✅ Can create/delete other admins
- ✅ See "User Management" link in sidebar
- ✅ Manage all content

### **Admin**

- ✅ Manage articles
- ✅ View dashboard
- ❌ Cannot manage users

### **User**

- ✅ View dashboard
- ✅ Create articles
- ❌ Cannot publish (needs approval)
- ❌ Cannot manage users

---

## 📁 File Structure

```
src/
├── lib/
│   └── api.ts                    # API client
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx   # Route protection
│   └── admin/
│       └── AdminLayout.tsx      # Admin layout with sidebar
└── app/
    ├── login/
    │   └── page.tsx             # Login page
    └── admin/
        ├── page.tsx             # Dashboard
        └── users/
            └── page.tsx         # User management
```

---

## 🔧 Environment Variables

Create `.env.local` in project root:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**For Production (VPS):**

```env
NEXT_PUBLIC_API_URL=https://api.neverbeforemarketing.com
```

---

## 🎨 Features Implemented

### ✅ Authentication

- [x] Login form
- [x] Logout functionality
- [x] Token management (localStorage)
- [x] Auto-redirect if not logged in
- [x] Remember user session

### ✅ User Management (Superadmin)

- [x] View all users
- [x] Create new admin/user
- [x] Delete users
- [x] Role assignment
- [x] User info display

### ✅ Dashboard

- [x] Welcome message
- [x] Stats overview
- [x] Quick actions
- [x] Sidebar navigation
- [x] Role-based menu items

### ✅ UI/UX

- [x] Theme-aware (uses your CSS variables)
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Clean, professional look

---

## 🧪 Testing Checklist

### Test Login Flow

- [ ] Visit `/login`
- [ ] Enter credentials
- [ ] Should redirect to `/admin` on success
- [ ] Should show error on wrong password
- [ ] Should save token to localStorage

### Test Protected Routes

- [ ] Try visiting `/admin` without logging in
- [ ] Should redirect to `/login`
- [ ] After login, should access `/admin`

### Test User Management (Superadmin)

- [ ] Login as superadmin
- [ ] See "User Management" in sidebar
- [ ] Click "Add User" button
- [ ] Create a new admin
- [ ] Verify admin appears in table
- [ ] Delete a user (not superadmin)

### Test Logout

- [ ] Click Logout button
- [ ] Should redirect to `/login`
- [ ] Token should be cleared
- [ ] Visiting `/admin` should redirect to login

---

## 🔐 Security Notes

### ✅ Already Implemented

- JWT token stored in localStorage
- Authorization header sent with protected requests
- Role-based access control
- Protected routes
- Superadmin-only features

### 🎯 For Production

- Use HTTPS (kamal-proxy handles this)
- Set secure environment variables
- Regular token expiration
- CORS properly configured on backend

---

## 🚀 Next Steps

### Ready to Build

1. **Articles Management** - CRUD for blog posts
2. **Portfolio Management** - Add/edit work items
3. **Media Upload** - Image/video upload
4. **Settings Page** - User preferences
5. **Analytics Dashboard** - View site stats

### When Deploying to VPS

1. Update `.env.local` to point to production API
2. Deploy backend first
3. Update frontend environment variable
4. Deploy frontend with Kamal
5. Test authentication flow on production

---

## 🆘 Troubleshooting

### "Network Error" on Login

- ✅ Check backend is running on port 8000
- ✅ Check CORS is configured (localhost:3000 in backend .env)
- ✅ Check .env.local has correct API URL

### "Token invalid" errors

- ✅ Clear localStorage
- ✅ Login again
- ✅ Check backend JWT secret hasn't changed

### Can't see User Management

- ✅ Make sure you're logged in as superadmin
- ✅ Check user role in dashboard (should say "superadmin")

### Page won't load / infinite redirect

- ✅ Clear browser cache
- ✅ Clear localStorage
- ✅ Try incognito mode

---

## 📞 Need Help?

The system is ready to go! Just:

1. Start your backend
2. Start the frontend (`npm run dev`)
3. Visit <http://localhost:3000/login>
4. Login with your superadmin credentials

Everything is wired up and ready to test! 🎉
