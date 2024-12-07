let movies = [];
let participants = [];
let hostName = ""; // To store the host's name

// On page load, extract the room code and user name
window.onload = function () {
    const roomCode = location.hash.slice(1);
    const userName = sessionStorage.getItem("userName");
    const isHost = sessionStorage.getItem("isHost") === "true"; // Check if the user is the host

    if (!roomCode || !userName) {
        alert("Missing room code or user name. Redirecting to the home page.");
        window.location.href = "index.html";
        return;
    }

    if (isHost) {
        hostName = userName; // Assign hostName if the user is the host
    }

    // Update room title
    const roomTitle = document.getElementById("roomTitle");
    roomTitle.textContent = `${hostName ? `${hostName}'s` : "The"} Movie Night Room`;

    // Display the room code
    document.getElementById("roomCodeDisplay").textContent = `Room Code: ${roomCode}`;

    // Add the current user to the participant list
    participants.push(userName);
    displayParticipants();

    // Populate initial movie list and participants (if syncing with backend, fetch here)
    updateMovieLists();
};

// Display the list of participants
function displayParticipants() {
    const participantList = document.getElementById("participantList");
    participantList.innerHTML = participants
        .map((participant) => `<div class="participant">${participant}</div>`)
        .join("");
}

// Function to submit a new movie suggestion
function submitMovie(event) {
    event.preventDefault();
    const titleInput = document.getElementById("movieTitle");
    const title = titleInput.value.trim();

    if (!title) {
        alert("Movie title cannot be empty!");
        return;
    }

    const movie = {
        id: Date.now(),
        title: title,
        votes: 0,
        voters: [],
    };

    movies.push(movie);
    titleInput.value = "";
    updateMovieLists();
}

// Function to vote for a movie
function vote(movieId) {
    const userName = sessionStorage.getItem("userName");
    const movie = movies.find((m) => m.id === movieId);

    if (movie) {
        if (!movie.voters.includes(userName)) {
            movie.votes++;
            movie.voters.push(userName);
            updateMovieLists();
        } else {
            alert("You have already voted for this movie.");
        }
    }
}

// Update the movie suggestion and voting lists
function updateMovieLists() {
    const votingList = document.getElementById("votingList");

    // Sort movies by vote count
    const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);

    votingList.innerHTML = sortedMovies
        .map(
            (movie) => `
        <div class="movie-suggestion">
            <span>${movie.title}</span>
            <div>
                <button class="vote-button" onclick="vote(${movie.id})">
                    Vote
                </button>
                <span class="vote-count">${movie.votes} votes</span>
            </div>
        </div>
    `
        )
        .join("");
}

// Placeholder functions for backend synchronization
function addParticipant(name) {
    if (!participants.includes(name)) {
        participants.push(name);
        displayParticipants();
    }
}

function removeParticipant(name) {
    participants = participants.filter((p) => p !== name);
    displayParticipants();
}

// Function to redirect to home
function goToHome() {
    window.location.href = "index.html";
}
