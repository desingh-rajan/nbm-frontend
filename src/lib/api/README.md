# API Client Documentation

Clean, entity-based API client structure for the NBM Frontend.

## Structure

```
src/lib/api/
├── index.ts      # Main exports and backward compatibility
├── client.ts     # Base API client with common functionality
├── auth.ts       # Authentication endpoints
├── user.ts       # User management endpoints
└── article.ts    # Article management endpoints
```

## Usage

### Recommended: Import specific API modules

```typescript
import { authApi } from '@/lib/api';
import { userApi } from '@/lib/api';
import { articleApi } from '@/lib/api';

// Authentication
await authApi.login(email, password);
await authApi.logout();
const user = await authApi.getMe();

// User management
const users = await userApi.getAll();
await userApi.create(email, password, username, role);
await userApi.delete(userId);

// Articles
const articles = await articleApi.getAll();
await articleApi.create(title, content, isPublished);
await articleApi.delete(articleId);
```

### Backward Compatible: Use the unified API object

```typescript
import { api } from '@/lib/api';

// Still works with old code
await api.login(email, password);
await api.getUsers();
await api.createArticle(title, content);
```

## Entity Modules

### `authApi` - Authentication

- `login(email, password)` - Login user
- `register(email, password, username)` - Register new user
- `getMe()` - Get current user
- `logout()` - Logout user
- `changePassword(oldPassword, newPassword)` - Change password
- `getToken()` - Get stored token
- `setToken(token)` - Store token
- `clearToken()` - Clear token

### `userApi` - User Management (Admin)

- `getAll(page?, limit?)` - Get paginated users
- `getById(id)` - Get user by ID
- `create(email, password, username, role)` - Create user
- `update(id, updates)` - Update user
- `delete(id)` - Delete user

### `articleApi` - Articles

- `getAll()` - Get all articles (includes drafts for admins)
- `getById(id)` - Get article by ID
- `create(title, content, published?)` - Create article
- `update(id, updates)` - Update article
- `delete(id)` - Delete article

## Base Client

The `ApiClient` class handles:
- ✅ Request/response normalization
- ✅ Automatic token management
- ✅ Error handling
- ✅ Development logging
- ✅ JSON serialization
- ✅ Response unwrapping (removes `{data: {...}}` wrapper)

## Adding New Entities

1. Create a new file: `src/lib/api/[entity].ts`
2. Import the client: `import { client } from './client';`
3. Export an object with methods: `export const entityApi = { ... }`
4. Add to `index.ts` exports

Example:

```typescript
// src/lib/api/portfolio.ts
import { client } from './client';

export const portfolioApi = {
  getAll() {
    return client.authRequest('/nbm-be/api/portfolio');
  },
  
  create(data: PortfolioData) {
    return client.authRequest('/nbm-be/api/portfolio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
```

## Benefits

✅ **Cleaner imports** - Import only what you need
✅ **Better organization** - Each entity in its own file
✅ **Type safety** - TypeScript interfaces per entity
✅ **Maintainability** - Easy to find and update endpoints
✅ **Scalability** - Add new entities without bloating one file
✅ **Backward compatible** - Old code still works with unified `api` object
