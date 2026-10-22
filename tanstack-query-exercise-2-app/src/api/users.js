
const API_URL = "https://dummyjson.com";

const CREATED_USERS_KEY = "tanstack-query-created-users";
const DELETED_USERS_KEY = "tanstack-query-deleted-users";

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Fetch server users and merge in demo-created users.
export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Unable to fetch users. Please try again.");
  }

  const result = await response.json();
  const createdUsers = readStorage(CREATED_USERS_KEY, []);
  const deletedIds = readStorage(DELETED_USERS_KEY, []);

  const serverUsers = result.users.filter(
    (user) => !deletedIds.includes(String(user.id)),
  );

  return [...createdUsers, ...serverUsers];
}

// Create a user using the API and retain it for the demo.
export async function createUser(user) {
    if (user.simulateFailure) {
        throw new Error("Simulated create failure for testing.");
    }
    const response = await fetch(`${API_URL}/users/add`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error("Unable to create user. Please try again.");
  }

  const result = await response.json();

  // Use a unique local ID because the API doesn't persist new users.
  const savedUser = {
    ...result,
    ...user,
    id: `local-${Date.now()}`,
  };

  const createdUsers = readStorage(CREATED_USERS_KEY, []);
  saveStorage(CREATED_USERS_KEY, [savedUser, ...createdUsers]);

  return savedUser;
}

// Delete a user, including demo-created users.
export async function deleteUser({
  userId,
  simulateFailure = false,
}) {
  if (simulateFailure) {
    throw new Error("Simulated delete failure for rollback testing.");
  }

  const isLocalUser = String(userId).startsWith("local-");

  if (!isLocalUser) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete user. Please try again.");
    }
  }

  const createdUsers = readStorage(CREATED_USERS_KEY, []);
  saveStorage(
    CREATED_USERS_KEY,
    createdUsers.filter((user) => String(user.id) !== String(userId)),
  );

  const deletedIds = readStorage(DELETED_USERS_KEY, []);
  if (!deletedIds.includes(String(userId))) {
    saveStorage(DELETED_USERS_KEY, [...deletedIds, String(userId)]);
  }

  return { id: userId, isDeleted: true };
}
