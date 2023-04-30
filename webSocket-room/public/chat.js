const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

socket.emit('select_room', {
    username,
    room
}, (messages) => {
    messages.forEach(message => {
        createMessage(message);
    });
});

const userDiv = document.querySelector('#username');

userDiv.innerHTML = `Olá ${username} você está na sala ${room}`;

document.querySelector('#message').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const content = event.target.value;

        socket.emit('message', {
            room,
            content,
            username
        });

        event.target.value = '';
    }
});

socket.on('message', (data) => {
    createMessage(data)
});


function createMessage(data) {
    const messageDiv = document.querySelector('#messages');

    messageDiv.innerHTML += `
        <div class="new_message">
            <label class="form-label">
                <strong>${data.username}</strong> 
                <span>
                    ${data.content} - ${dayjs(data.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </span>
            </label>
        </div>
    `;
}

const logout = document.querySelector('#logout').addEventListener('click', () => {
    window.location.href = 'index.html';
})