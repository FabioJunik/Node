import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

interface Message {
    content: string;
    room: string;
    createdAt: Date;
    username: string;
}

const users: RoomUser[] = [];

const messages: Message[] = [];

io.on('connection', (socket) => {

    socket.on('select_room', (data: RoomUser, callback) => {

        socket.join(data.room)

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

    });

    socket.on('message', (data: Message) => {
        data.createdAt = new Date();

        messages.push(data);

        io.to(data.room).emit('message', data);
    });
})
