import { sign, verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { addMinutes } from 'date-fns';
import DatabaseService from './database.service';
import { compare, hash } from 'bcrypt';
import User from '../models/users.model'


class AuthService {
    public userService = new DatabaseService(User);
  
    public createToken(user_id, secretKey, expire_in): TokenData {
      const dataStoredInToken: DataStoredInToken = { id: user_id };
      const createdAt: Date = new Date(Date.now());
      const expiresIn: number = expire_in * 60;
      const expiresAt: Date = addMinutes(createdAt, expire_in);
      return { createdAt, expiresAt, expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    public async verifyToken(token, secretKey) {
        try {
          if (secretKey) {
            const verificationResponse = (await verify(token, secretKey)) as DataStoredInToken;
            const userId = verificationResponse.id;
            const findUserResponse = await this.userService.find({ _id: userId });
    
            return findUserResponse.result;
          } else {
            throw new HttpException(404, 'Authentication token missing');
          }
        } catch (error) {
          new HttpException(401, 'wrong authentication token');
        }
      }

      public async generatePassword(key: string) {
        const passwordHash = await hash(key, 10);
        return { passwordHash, key };
      }
    
      public async verifyPassword(key: string, password: string): Promise<boolean> {
        return await compare(password, key);
      }
    }
    
    export default AuthService;