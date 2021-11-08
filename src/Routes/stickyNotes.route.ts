/* eslint-disable linebreak-style */
import {
  Router, Request, Response,
} from 'express';
import { query, validationResult } from 'express-validator';
import { responseCodes } from '../responseCodes';
import {
  getNotes,
} from '../Services.ts/stickyNote.service';

const stickyNoteRoute = Router();

stickyNoteRoute.get('/', [
  query('userId', 'invalid params').trim().isLength({ min: 1 }),
], (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(responseCodes.BAD_REQUEST).send({ error: errors.array()[0] });
  } else {
    getNotes(req, (status: number, responseData: object) => {
      res.status(status).send(responseData);
    });
  }
});

export default stickyNoteRoute;
