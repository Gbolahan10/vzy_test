import { Request } from 'express';
import { UserDto } from '../dtos/users.dtos';
export interface DataStoredInToken {
    id: number;
}
export interface TokenData {
    token: string;
    createdAt: Date;
    expiresAt: Date;
    expiresIn: number;
}
export interface RequestWithUser extends Request {
    user: UserDto;
}
