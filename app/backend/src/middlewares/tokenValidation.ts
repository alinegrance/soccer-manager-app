import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const secret = process.env.JWT_SECRET || 'secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }
  try {
    const jwtPayload = jwt.verify(token, secret);
    res.locals.jwtPayload = jwtPayload;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
