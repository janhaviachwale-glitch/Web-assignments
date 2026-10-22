
import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";
import { useDeleteUser } from "./hooks/useDeleteUser";

export default function UserManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [simulateCreateFailure, setSimulateCreateFailure] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);

  const {
    data: users = [],
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useUsers();

  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

function handleCreateUser(event) {
  event.preventDefault();

  createMutation.mutate(
    {
      firstName: name.trim(),
      email: email.trim(),
      role,
      simulateFailure: simulateCreateFailure,
    },
    {
      onSuccess: () => {
        setName("");
        setEmail("");
        setRole("User");
      },
    },
  );
}

  function handleDeleteUser(userId) {
    deleteMutation.mutate({
        userId,
        simulateFailure,
    });
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>User Management</h1>
        <p className="subtitle">
          Create, view and delete users while keeping the query cache in sync.
        </p>
      </header>

      <section className="panel">
        <h2>Create a user</h2>

        <form onSubmit={handleCreateUser} className="user-form">
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter full name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </label>

          <label>
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </label>

          <button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create user"}
          </button>
        </form>

        <label className="failure-toggle">
        <input
            type="checkbox"
            checked={simulateCreateFailure}
            onChange={(event) =>
                    setSimulateCreateFailure(event.target.checked)
            }
        />
        Simulate create failure (for testing error state)
        </label>

        {createMutation.isPending && (
          <p className="status pending">Creating user…</p>
        )}
        {createMutation.isSuccess && (
          <p className="status success">
            User creation request succeeded.
          </p>
        )}
        {createMutation.isError && (
          <p className="status error">
            Could not create user: {createMutation.error.message}
          </p>
        )}
      </section>

      <section className="panel">
        <div className="list-heading">
          <div>
            <h2>Users</h2>
            <p className="muted">Fetched using the ['users'] query.</p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing..." : "Refresh list"}
          </button>
        </div>

        <label className="failure-toggle">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(event) => setSimulateFailure(event.target.checked)}
          />
          Simulate delete failure (for testing rollback)
        </label>

        {isPending && <p className="status pending">Loading users…</p>}

        {isError && (
          <p className="status error">
            Could not load users: {error.message}
          </p>
        )}

        {!isPending && !isError && users.length === 0 && (
          <p className="empty-state">No users found.</p>
        )}

        {!isPending && !isError && users.length > 0 && (
          <div className="user-list">
            {users.map((user) => (
              <article className="user-card" key={user.id}>
                <div className="avatar">
                  {(user.firstName || user.name || "?")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="user-info">
                  <h3>
                    {user.firstName || user.name}
                    {user.lastName ? ` ${user.lastName}` : ""}
                  </h3>
                  <p>{user.email}</p>
                  <span className="role-tag">
                    {user.role || "User"}
                  </span>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </article>
            ))}
          </div>
        )}

        {deleteMutation.isPending && (
          <p className="status pending">Delete request in progress…</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="status success">Delete request succeeded.</p>
        )}
        {deleteMutation.isError && (
          <p className="status error">
            Delete failed: {deleteMutation.error.message}
            {" "}The previous user list should be restored.
          </p>
        )}
      </section>
    </main>
  );
}