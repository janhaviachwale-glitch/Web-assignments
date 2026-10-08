console.log("Program started");

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fetchRepositories(username) {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos`
    );

    if (response.status === 404) {
        throw new Error("GitHub username not found.");
    }

    if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }

    if (!response.ok) {
        throw new Error(
            `GitHub API error: ${response.status} ${response.statusText}`
        );
    }

   return await response.json();
}

async function fetchOwner(username) {
    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch owner details");
    }

    return await response.json();
}

async function displayGitHubData(username) {
    try {
        console.log("\nFetching latest GitHub data...");

        const repositories = await fetchRepositories(username);

        if (repositories.length === 0) {
            console.log("This user has no public repositories.");
            return;
        }

        const owner = await fetchOwner(username);

        console.log("\n==============================");
        console.log("GitHub Repository Tracker");
        console.log("==============================");

        console.log("\nOwner Details");
        console.log("------------------------------");
        console.log(`Name: ${owner.name || "Not available"}`);
        console.log(`Username: ${owner.login}`);
        console.log(`Bio: ${owner.bio || "No bio"}`);
        console.log(`Followers: ${owner.followers}`);
        console.log(`Public Repositories: ${owner.public_repos}`);

        console.log("\nRepositories");
        console.log("------------------------------");

        repositories.forEach((repo) => {
            console.log(`Name: ${repo.name}`);
            console.log(`Description: ${repo.description || "No description"}`);
            console.log(`Language: ${repo.language || "Not specified"}`);
            console.log(`URL: ${repo.html_url}`);
            console.log("------------------------------");
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

rl.question("Enter GitHub username: ", async (username) => {
    username = username.trim();

    if (!username) {
        console.log("GitHub username cannot be empty.");
        rl.close();
        return;
    }

    await displayGitHubData(username);

    console.log("\nData will refresh every 60 seconds.");

    setInterval(() => {
        displayGitHubData(username);
    }, 60000);
});