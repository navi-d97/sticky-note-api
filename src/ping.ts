/* eslint-disable linebreak-style */
import {
    Router, Request, Response,
  } from 'express';

const pingRoute  = Router();
pingRoute.get('/', [], (req: Request, res: Response) => {
    res.status(200).send('pong');;
});

export default pingRoute;
  