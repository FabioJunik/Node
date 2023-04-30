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

    socket.on('select_room', (data, callback) => {

        socket.join(data.room)

        const userInRoom = users.find(user => user.room === data.room && user.username === data.username);

        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        } else {
            users.push({
                socket_id: socket.id,
                username: data.username,
                room: data.room,
            });
        }

        const messagesRoom = getMessagesRoom(data.room);

        callback(messagesRoom);
    });

    socket.on('message', (data: Message) => {
        data.createdAt = new Date();

        messages.push(data);

        io.to(data.room).emit('message', data);
    });
})

const getMessagesRoom = (room: string) => messages.filter(message => message.room === room);