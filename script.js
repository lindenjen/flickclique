function createRoom() {
    // Generate a random room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Your room code is: ${roomCode}`);
    // In a real implementation, this would redirect to the room page
    // window.location.href = `/room/${roomCode}`;
}

function joinRoom() {
    const code = document.getElementById('roomCode').value;
    if (code.length === 0) {
        alert('Please enter a room code');
        return;
    }
    // In a real implementation, this would validate the code and redirect
    // window.location.href = `/room/${code}`;
    alert(`Joining room: ${code}`);
}