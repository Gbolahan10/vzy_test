import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import DatabaseService from '../services/database.service';
import User from '../models/users.model';
import { UpdateUserDto } from '../dtos/users.dtos';

class UsersController {
    public userService = new DatabaseService(User);
    
    public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { _id } = req.user;
          const userData: UpdateUserDto = req.body;
          await this.userService.update({_id: _id}, userData);
    
          res.status(200).json({ message: 'User details updated' });
        } catch (error) {
          next(error);
        }
      };

    public manuallyEndSubscription = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
      try {
          const { status, _id } = req.user;
          if ( status === "EXPIRED") {
              throw new HttpException(400, "You currently don't have an active subscription")
          }

          await this.userService.update({_id: _id}, {status: "EXPIRED"})
          
          res.status(200).json({ message: 'Subscription ended successfully' });

      } catch (error) {
          next(error);
          }
  }
}

export default UsersController;