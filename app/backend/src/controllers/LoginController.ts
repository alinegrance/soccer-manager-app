import { Request, Response } from 'express';
import createToken from '../utils/jwt';
import UserService from '../services/UserService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = createToken(user);
    res.status(200).send({ token });
  }

  public static async getRole(req: Request, res: Response) {
    const { data: { userId } } = req.body;
    const user = await UserService.getById(userId);
    return res.status(200).send({ role: user?.role });
  }
}
