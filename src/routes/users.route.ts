import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import UsersController from '../controllers/users.controller';
import { UpdateUserDto } from '../dtos/users.dtos';

class UsersRoute implements Routes {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/update`, validationMiddleware(UpdateUserDto, 'body'), authMiddleware, this.usersController.updateUser);
    this.router.get(`${this.path}/subscription/end`, authMiddleware, this.usersController.manuallyEndSubscription);
    }
}

export default UsersRoute;
