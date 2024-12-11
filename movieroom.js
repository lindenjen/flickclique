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
        const voterIndex = movie.voters.indexOf(userName);

        if (voterIndex === -1) {
            // User hasn't voted for this movie yet, so add their vote
            movie.votes++;
            movie.voters.push(userName);
        } else {
            // User has already voted for this movie, so remove their vote
            movie.votes--;
            movie.voters.splice(voterIndex, 1);
        }

        updateMovieLists();
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

function lockInVotes() {
    if (movies.length === 0) {
        alert("No movies have been suggested yet.");
        return;
    }

    // Determine the movie with the most votes
    const maxVotes = Math.max(...movies.map((movie) => movie.votes));
    const topMovies = movies.filter((movie) => movie.votes === maxVotes);

    let selectedMessage;
    if (maxVotes === 0) {
        selectedMessage = "No votes have been cast yet.";
    } else if (topMovies.length > 1) {
        selectedMessage = `It's a tie! The top movies are: ${topMovies.map((m) => m.title).join(", ")} with ${maxVotes} votes each.`;
    } else {
        selectedMessage = `The chosen movie is: "${topMovies[0].title}" with ${maxVotes} votes.`;
    }

    // Display the selected movie
    const selectedMovieDiv = document.getElementById("selectedMovie");
    selectedMovieDiv.textContent = selectedMessage;
    selectedMovieDiv.style.display = "block";

    if (maxVotes > 0 && topMovies.length === 1) {
        // Display the schedule button if there's a chosen movie
        document.getElementById("scheduleButton").style.display = "block";
    }
}


function redirectToSchedule() {
    const selectedMovieDiv = document.getElementById("selectedMovie").textContent;
    const movieNameMatch = selectedMovieDiv.match(/The chosen movie is: "([^"]+)"/);
    const movieName = movieNameMatch ? movieNameMatch[1] : "your movie";
    sessionStorage.setItem("selectedMovie", movieName.trim());
    window.location.href = "schedule.html";
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
