import { Request, Response, NextFunction } from 'express';
import AuthController from '../src/controllers/auth.controller';
import { HttpException } from '../src/exceptions/HttpException';

jest.mock('../src/services/database.service'); 

describe('AuthenticationController', () => {
  let authController: AuthController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let createMock, findMock

  authController = new AuthController();
  res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  next = jest.fn() as unknown as NextFunction;
  createMock = jest.spyOn(authController.userService, 'create');
  findMock = jest.spyOn(authController.userService, 'find');

  beforeEach(() => {
    req = { body: { email: "test@gmail.com", password: "password" }} as unknown as Request;
    jest.clearAllMocks();
  });
  
  it('should sign in a user and return a success response', async () => {
    findMock.mockResolvedValue({
        status: true,
        result: {
            _id: 'userId',
            email: 'test@gmail.com',
            password: 'hashedPassword',
        },
    });
    authController.authService.verifyPassword = jest.fn().mockResolvedValue(true);
  
    authController.authService.createToken = jest.fn().mockResolvedValue({
        createdAt: new Date(),
        expiresAt: new Date(),
        expiresIn: 1,
        token: 'generatedToken',
    });
  
    await authController.signInByEmail(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        data: {
          user: {
                _id: 'userId',
                email: 'test@gmail.com',
                password: "hashedPassword",
            },
            token_details: {
              token: 'generatedToken',
              createdAt: expect.any(Date),
              expiresAt: expect.any(Date),
              expiresIn: 1,
            }
        },
        message: 'Login successful',
    });
    expect(findMock).toHaveBeenCalledWith({email: 'test@gmail.com'});
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle the case where the user does not exist', async () => {
    findMock.mockResolvedValue({ status: false, result: null });

    await authController.signInByEmail(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HttpException(409, 'Incorrect Email/Password combination'));
});

it('should handle the case where the password is incorrect', async () => {
  findMock.mockResolvedValue({
      status: true,
      result: {
          _id: 'userId',
          email: 'test@gmail.com',
          password: 'hashedPassword',
      },
  });

  authController.authService.verifyPassword = jest.fn().mockResolvedValue(false);

  await authController.signInByEmail(req, res, next);

  expect(res.status).not.toHaveBeenCalledWith();
  expect(res.json).not.toHaveBeenCalledWith();
  expect(next).toHaveBeenCalledWith(new HttpException(401, 'Password Incorrect'));
});

  beforeEach(() => {
    req = { body: { firstName: "firstname", lastName: "lastname", email: "test@gmail.com", password: "password", countryCode: "234", phoneNumber: "8023456789" }} as unknown as Request;
    jest.clearAllMocks();
  });

  it('should create a new user store - SIGN UP', async () => {
    findMock.mockResolvedValueOnce({ status: false, result: null });
    authController.authService.generatePassword = jest.fn().mockResolvedValue({ passwordHash: 'hashedPassword' });
    
    createMock.mockResolvedValueOnce({ status: true, result: { _id: 'user_id', firstName: 'firstname' } });
    await authController.signUpByEmail(req, res, next);

    expect(createMock).toHaveBeenCalledWith({ firstName: "firstname", lastName: "lastname", email: "test@gmail.com", password: 'hashedPassword', countryCode: "234", phoneNumber: "8023456789" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: {user: { _id: 'user_id', firstName: 'firstname' }}, message: 'Account created successfully.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle the case where the user already exists', async () => {
    findMock.mockResolvedValue({ status: true, result: { _id: 'existingUserId' } });

    await authController.signUpByEmail(req, res, next);

    expect(createMock).not.toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HttpException(409, 'Account already exists'));
});

it('should handle errors during user creation', async () => {
  findMock.mockResolvedValue({ status: false, result: null });
  authController.authService.generatePassword = jest.fn().mockResolvedValue({ passwordHash: 'hashedPassword' });

  createMock.mockResolvedValue({ status: false, error: 'User creation error' });

  await authController.signUpByEmail(req, res, next);

  expect(createMock).toHaveBeenCalledWith({ firstName: "firstname", lastName: "lastname", email: "test@gmail.com", password: 'hashedPassword', countryCode: "234", phoneNumber: "8023456789" });
  expect(next).toHaveBeenCalledWith(new HttpException(409, 'User creation error'));
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
});


});