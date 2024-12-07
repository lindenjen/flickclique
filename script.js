function createRoom() {
    const hostName = document.getElementById('hostName').value.trim();
    if (!hostName) {
        document.getElementById('hostNameError').style.display = 'block';
        return;
    }

    // Hide error message
    document.getElementById('hostNameError').style.display = 'none';

    // Generate a random room code and store the host's name
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    sessionStorage.setItem('userName', hostName);
    sessionStorage.setItem('isHost', 'true'); // Mark the user as the host
    window.location.href = `movieroom.html#${roomCode}`;
}

function joinRoom() {
    const joinName = document.getElementById('joinName').value.trim();
    const roomCode = document.getElementById('roomCode').value.trim();

    if (!joinName) {
        document.getElementById('joinNameError').style.display = 'block';
        return;
    }

    if (!roomCode) {
        document.getElementById('roomCodeError').style.display = 'block';
        return;
    }

    // Hide error messages
    document.getElementById('joinNameError').style.display = 'none';
    document.getElementById('roomCodeError').style.display = 'none';

    // Store the user's name and navigate to the room
    sessionStorage.setItem('userName', joinName);
    sessionStorage.setItem('isHost', 'false'); // Mark the user as a participant, not the host
    window.location.href = `movieroom.html#${roomCode}`;
}
