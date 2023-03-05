import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }
  if (!emailRegex.test(email) || password.length < 6) {
    // console.log('OIOIOIO TO AQUI');
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  next();
};

export default loginValidation;
