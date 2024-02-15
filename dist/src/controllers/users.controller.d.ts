import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DatabaseService from '../services/database.service';
declare class UsersController {
    userService: DatabaseService;
    updateUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    manuallyEndSubscription: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default UsersController;
