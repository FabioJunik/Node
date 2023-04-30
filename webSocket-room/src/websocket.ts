import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

const users: RoomUser[] = [];

io.on('connection', (socket) => {

    socket.on('select_room', (data) => {
        const userInRoom = users.find(user => user.room === data.room && user.username === data.username);

        if (userInRoom) {
            userInRoom.socket_id = socket.id;
            return;
        }

        users.push({
            socket_id: socket.id,
            username: data.username,
            room: data.room,
        });

        console.log(users)
    })
})