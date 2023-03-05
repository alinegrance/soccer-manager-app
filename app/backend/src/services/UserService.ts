import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';

export default class UserService {
  public static async login(email:string, password: string): Promise<User | null> {
    const user = await User.findOne({
      where: { email },
    });
    return bcrypt.compareSync(password, user?.password || '123') ? user : null;
  }

  public static async getById(userId: number): Promise<User | null> {
    const user = await User.findByPk(userId);
    return user;
  }
}
