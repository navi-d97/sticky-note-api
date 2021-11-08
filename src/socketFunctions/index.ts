import { Socket } from "socket.io";
import { io } from "../app";
import NOTES_DOC from "../db/Models/stickyNotes.model";

export const createNote = async (userId: string, newData: any, client: Socket) => {
    const dataToSave = {userId, ...newData}
    const data = await new NOTES_DOC(dataToSave).save();
    client.broadcast.to(userId).emit('onNoteCreated', {id:newData.id,newData});
}

export const updateNote = async (userId: string, id: string, note: any, client: Socket) => {
    const data = await NOTES_DOC.findOneAndUpdate({id}, note);
    client.broadcast.to(userId).emit('onNoteUpdated', {id, data: note});
}

export const deleteNote = async (userId: string, id: string, client: Socket) => {
    const data = await NOTES_DOC.findOneAndDelete({id});
    client.broadcast.to(userId).emit('onNoteDeleted', id);
}

export const clearAll = async (userId: string, client: Socket) => {
    await NOTES_DOC.deleteMany({userId});
    client.broadcast.to(userId).emit('allNotesCleared');
}