import { Request } from "express";
import { responseCodes } from "../responseCodes";
import NOTES_DOC from "../db/Models/stickyNotes.model";

export async function getNotes(
    request: Request,
    callback: (status: number, responseData: object) => void,
): Promise<void> {
    try {
        const categories = await NOTES_DOC.find({userId: request.query.userId });
        const data = categories.reduce((obj: any, item: any) => (obj[item.id] = item, obj) ,{});
        return callback(responseCodes.SUCCESS, data );
    } catch (error) {
        return callback(responseCodes.SERVER_ERROR, {});
    }
}

