# GitHub Repository Tracker

A Node.js command-line application that fetches and displays GitHub repository and user information using the GitHub REST API.

The project was created as part of the Asynchronous JavaScript training assignment to practice asynchronous programming concepts such as `fetch`, Promises, `async/await`, error handling and periodic data refresh.

## Objective

The objective of this assignment is to build a GitHub repository tracker that:
* Accepts a GitHub username from the user.
* Fetches the user's public repositories.
* Fetches GitHub user/owner details.
* Displays repository and owner information in the console.
* Refreshes the data periodically using `setInterval`.
* Handles invalid usernames, API failures, rate limits, and users with no public repositories.
* Uses `async/await` and `try/catch` for asynchronous operations and error handling.

## Features

### 1. GitHub Username Input

The application accepts a GitHub username through the command line using Node.js `readline`.

Example:

```text
Enter GitHub username: torvalds
```

### 2. Repository Information

For the provided username, the application fetches public repositories using the GitHub REST API.

For each repository, it displays:

* Repository name
* Description
* Programming language
* Repository URL

### 3. Owner Information

The application fetches GitHub user information and displays:

* Name
* Username
* Bio
* Followers
* Number of public repositories

### 4. Automatic Refresh

The application refreshes GitHub data every 60 seconds using `setInterval`.

This ensures that the displayed information can be updated without restarting the application.

### 5. Error Handling

The application handles different failure scenarios:

* Invalid GitHub username
* GitHub API rate limit
* Other API errors
* Network/request failures
* User with no public repositories
* Empty username input

Errors are handled using `try/catch` so that the application does not terminate unexpectedly.

## Technologies Used

* JavaScript
* Node.js
* GitHub REST API
* Fetch API
* Promises
* `async/await`
* `try/catch`
* `setInterval`
* Node.js `readline`

## Asynchronous JavaScript Concepts Used

### Async/Await

The application uses `async/await` to make asynchronous API calls easier to read and maintain.

```js
const repositories = await fetchRepositories(username);
const owner = await fetchOwner(username);
```

### Promises

The Fetch API returns a Promise. `await` is used to wait for the Promise to resolve.

### Error Handling

Asynchronous operations are wrapped inside `try/catch`:

```js
try {
    // asynchronous operations
} catch (error) {
    console.error(`Error: ${error.message}`);
}
```

### setInterval

The application periodically refreshes the data:

```js
setInterval(() => {
    displayGitHubData(username);
}, 60000);
```

## API Endpoints

### Get User Repositories

```text
GET https://api.github.com/users/{username}/repos
```

Used to retrieve the user's public repositories.

### Get User Details

```text
GET https://api.github.com/users/{username}
```

Used to retrieve GitHub user/owner information.

## Error Handling Details

The application checks the HTTP response status before processing the response.

### 404 - User Not Found

If the GitHub username does not exist:

```text
GitHub username not found.
```

### 403 - Rate Limit

If the GitHub API rate limit is exceeded:

```text
GitHub API rate limit exceeded. Please try again later.
```

### Other API Errors

Other unsuccessful HTTP responses are reported with the status code and status text.

### No Public Repositories

If the user exists but has no public repositories:

```text
This user has no public repositories.
```

## Project Structure

```text
github-repository-tracker/
│
├── index.js       # Main application logic
├── package.json   # Node.js project configuration
└── README.md      # Project documentation
```

## How to Run

### Prerequisites

* Node.js installed
* Internet connection
* GitHub username

### Installation

Clone the repository and navigate to the project directory.

```bash
cd github-repository-tracker
```

No external npm package is required for the application.

### Run the Application

```bash
node index.js
```

Enter a GitHub username when prompted:

```text
Enter GitHub username: torvalds
```

## Example Output

```text
Fetching latest GitHub data...

==============================
GitHub Repository Tracker
==============================

Owner Details
------------------------------
Name: Linus Torvalds
Username: torvalds
Bio: ...
Followers: ...
Public Repositories: ...

Repositories
------------------------------
Name: ...
Description: ...
Language: ...
URL: ...
------------------------------

Data will refresh every 60 seconds.
```

## Testing

The application was tested with the following scenarios:

| Scenario                         | Expected Result                         |
| -------------------------------- | --------------------------------------- |
| Valid GitHub username            | Displays owner and repository details   |
| Invalid username                 | Displays user-not-found error           |
| Empty username                   | Displays validation message             |
| User with no public repositories | Displays no-public-repositories message |
| API rate limit                   | Displays rate-limit error               |
| Other API failure                | Displays API error details              |
| Automatic refresh                | Fetches latest data every 60 seconds    |
