# Component Architecture Guide

## Modular Component Structure

This project follows a clean, modular component architecture pattern where complex UI components are extracted into separate files for better maintainability and reusability.

## Site Settings Example

### File Structure

```
src/
├── app/
│   └── admin/
│       └── site-settings/
│           └── page.tsx                    # Main page (clean & simple)
└── components/
    └── admin/
        └── site-settings/
            ├── CreateSettingModal.tsx      # Create modal component
            ├── ViewSettingModal.tsx        # View/Edit modal component
            └── index.ts                    # Barrel export
```

### Benefits

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Modal components can be used in multiple pages
3. **Maintainability**: Easier to find and edit specific functionality
4. **Readability**: Main page file is clean and focused on business logic
5. **Testing**: Isolated components are easier to test

### Page Structure (page.tsx)

The main page file should contain:

- **Data Fetching**: Using custom hooks (e.g., `useSiteSettings()`)
- **State Management**: Local UI state for modals, filters, etc.
- **Business Logic**: Handlers for actions (create, edit, delete)
- **Layout**: Main UI structure and component composition
- **Modal Rendering**: Conditional rendering of extracted modal components

### Component Structure (Modal Files)

Each extracted component should:

- Accept props for data and callbacks (`onClose`, `onSuccess`)
- Handle its own internal state (form data, edit mode, etc.)
- Use custom hooks for mutations (e.g., `useCreateSiteSetting()`)
- Provide clear prop interfaces with TypeScript

### Import Pattern

```typescript
// ✅ Clean barrel import from components
import { CreateSettingModal, ViewSettingModal } from '@/components/admin/site-settings'

// ✅ Custom hooks from centralized hooks
import { useSiteSettings } from '@/hooks'

// ❌ Avoid inline component definitions in page files
```

## Pattern to Follow for All Entities

This pattern should be applied consistently across all admin entities:

### Users Page

```
src/
├── app/admin/users/page.tsx
└── components/admin/users/
    ├── CreateUserModal.tsx
    ├── EditUserModal.tsx
    └── index.ts
```

### Articles Page

```
src/
├── app/admin/articles/page.tsx
└── components/admin/articles/
    ├── CreateArticleModal.tsx
    ├── EditArticleModal.tsx
    └── index.ts
```

## Best Practices

1. **Keep page.tsx under 250 lines**: If it's longer, extract components
2. **Use barrel exports**: Create `index.ts` files to re-export components
3. **Consistent naming**: `{Entity}{Action}Modal.tsx` (e.g., `CreateUserModal.tsx`)
4. **Props interface**: Always define clear TypeScript interfaces for props
5. **Callback pattern**: Use `onSuccess` and `onClose` callbacks for parent communication
6. **Hook composition**: Combine custom hooks for data fetching and mutations

## Example Implementation

### Main Page (Simplified)

```typescript
'use client'

import { useState } from 'react'
import { useSiteSettings } from '@/hooks'
import { CreateSettingModal, ViewSettingModal } from '@/components/admin/site-settings'

export default function SiteSettingsPage() {
  const { data: settings = [], isLoading, error, refetch } = useSiteSettings()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSetting, setSelectedSetting] = useState(null)

  const handleSuccess = () => {
    setShowCreateModal(false)
    setSelectedSetting(null)
    refetch()
  }

  return (
    <>
      {/* Main UI */}
      <button onClick={() => setShowCreateModal(true)}>Create</button>
      
      {/* Modals */}
      {showCreateModal && (
        <CreateSettingModal onClose={() => setShowCreateModal(false)} onSuccess={handleSuccess} />
      )}
    </>
  )
}
```

### Extracted Modal Component

```typescript
'use client'

import { useState } from 'react'
import { useCreateSiteSetting } from '@/hooks'

interface CreateSettingModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateSettingModal({ onClose, onSuccess }: CreateSettingModalProps) {
  const { mutate: createSetting, isPending } = useCreateSiteSetting()
  const [formData, setFormData] = useState({ ... })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createSetting(formData, {
      onSuccess: () => onSuccess(),
      onError: (error) => alert(error.message)
    })
  }

  return <div>{/* Modal UI */}</div>
}
```

## Migration Strategy

When refactoring existing pages:

1. ✅ Identify large inline components (>50 lines)
2. ✅ Create component directory: `src/components/admin/{entity}/`
3. ✅ Extract component to new file with props interface
4. ✅ Create barrel export (`index.ts`)
5. ✅ Update page imports
6. ✅ Test functionality
7. ✅ Verify no TypeScript errors

## Conclusion

This modular approach creates a scalable, maintainable codebase where:

- **Pages** are focused on orchestration and layout
- **Components** are focused on specific UI functionality
- **Hooks** handle data fetching and state management
- **Types** ensure type safety across the application
