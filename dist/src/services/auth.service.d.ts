import { TokenData } from '../interfaces/auth.interface';
import DatabaseService from './database.service';
declare class AuthService {
    userService: DatabaseService;
    createToken(user_id: any, secretKey: any, expire_in: any): TokenData;
    verifyToken(token: any, secretKey: any): Promise<any>;
    generatePassword(key: string): Promise<{
        passwordHash: any;
        key: string;
    }>;
    verifyPassword(key: string, password: string): Promise<boolean>;
}
export default AuthService;
