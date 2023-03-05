import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../database/models/UserModel';

dotenv.config();

const createToken = (user: User | undefined) => {
  const secret = process.env.JWT_SECRET || 'secret';
  const jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: { user } }, secret, jwtConfig);
};

export default createToken;
