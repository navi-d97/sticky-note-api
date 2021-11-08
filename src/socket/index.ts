import { Socket } from "socket.io";
import { clearAll, createNote, deleteNote, updateNote } from "../socketFunctions";

export const onConnection = (client: Socket) => {
    client.on('subscribe', (topic: string) => {
        client.join(topic);
    });
    client.on('unsubscribe', (topic: string) => {
        client.leave(topic);
    });

    client.on('createNote', (
        userId: string,
        values: any,
    ) => createNote(userId, values, client));

    client.on('updateNote', (
        userId: string,
        id: string,
        values: any,
    ) => updateNote(userId, id, values, client));

    client.on('deleteNote', (
        userId: string,
        id: string,
    ) => deleteNote(userId, id, client));

    client.on('clearAll', (userId: string)=> clearAll(userId, client))
}