import { Request, Response } from 'express';

export const CONNECT = (req: Request, res: Response) => {
  res.status(200).send('Connected to API')
}