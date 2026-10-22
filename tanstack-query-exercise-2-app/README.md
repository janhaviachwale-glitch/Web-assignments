
# TanStack Query - Exercise 2

A React user management application built with TanStack Query (React Query). This project demonstrates server-state management, mutations, query invalidation and optimistic UI updates.

## Features

- Fetch and display users using `useQuery`.
- Create users using a custom `useCreateUser` hook and `useMutation`.
- Display pending, success, and error states for mutations.
- Invalidate the `users` query after a successful create operation.
- Delete users using a custom `useDeleteUser` hook.
- Optimistically remove users from the list before the delete request finishes.
- Restore the previous cached user list if a delete operation fails.
- Invalidate the users query after a delete operation settles.
- Use React Query DevTools to inspect query state and cache updates.
- Include test controls to simulate create and delete failures.

## Technologies Used

- React
- Vite
- JavaScript
- TanStack Query
- TanStack React Query DevTools
- DummyJSON Users API
- CSS

## Project Structure

```text
src/
├── api/
│   └── users.js
├── hooks/
│   ├── useUsers.js
│   ├── useCreateUser.js
│   └── useDeleteUser.js
├── App.jsx
├── App.css
├── UserManagement.jsx
├── index.css
└── main.jsx
```

- `api/users.js`: Fetches users and handles create and delete operations. Demo-created and deleted users are tracked in browser local storage because the demo API does not persist write operations.
- `hooks/useUsers.js`: Fetches users using the `['users']` query key.
- `hooks/useCreateUser.js`: Creates a user and invalidates the users query after success.
- `hooks/useDeleteUser.js`: Handles optimistic deletion, cache updates, rollback on failure, and query invalidation.
- `UserManagement.jsx`: Contains the form, user list, mutation feedback, and test controls.
- `main.jsx`: Configures the QueryClient, QueryClientProvider, and React Query DevTools.

## Testing

### 1. Fetch users

- Start the application.
- Confirm that the user list loads.
- Open React Query DevTools and inspect the `['users']` query.

### 2. Create a user successfully

- Ensure the create-failure checkbox is unchecked.
- Enter a name, email, and role.
- Submit the form.
- Confirm that a success message appears, the form resets, and the new user appears in the list.

### 3. Test create failure

- Check the create-failure checkbox.
- Submit the form with valid details.
- Confirm that the simulated error message appears.

### 4. Delete a user successfully

- Ensure the delete-failure checkbox is unchecked.
- Delete a user.
- Confirm that the user disappears from the list and the query refreshes.

### 5. Test optimistic rollback

- Check the delete-failure checkbox.
- Delete a user.
- Confirm that the user disappears immediately and is restored after the simulated failure.

### 6. Inspect React Query DevTools

- Inspect the `['users']` query.
- Observe query state changes and invalidation after mutations.

## Implementation Notes

- The users query uses the query key `['users']`.
- Query invalidation is used to refresh data after mutations.
- Optimistic deletion cancels in-flight users queries and saves the previous cached list before updating the cache.
- If deletion fails, the previous cached list is restored.
- The users query is invalidated after the delete mutation settles.
- Test checkboxes allow create and delete error states to be demonstrated without depending on network failures.

## API

The application uses the DummyJSON Users API:

https://dummyjson.com/users

DummyJSON simulates create and delete responses rather than persisting those changes on the server. The application uses browser local storage to retain demo-created users and remember deleted users during subsequent list fetches in the same browser.
