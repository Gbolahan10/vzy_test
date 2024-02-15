import compression from 'compression';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, DATABASE_URL, ORIGIN, CREDENTIALS, LOG_FORMAT } from './src/config/index';
import { Routes } from './src/interfaces/routes.interface';
import errorMiddleware from './src/middlewares/error.middleware';
import { logger, stream } from './src/utils/helpers/logger';


declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer | string;
    }
  }
}

// Middleware for filtering raw request body
const storeRawBodyMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.originalUrl !== '/payment/webhook') {
    express.json()(req, res, next);
    return;
  }

  let rawData = '';
  req.on('data', (chunk) => {
    rawData += chunk;
  });

  req.on('end', () => {
    req.rawBody = rawData;
    next();
  });

  req.on('error', (err) => {
    console.error('Error reading request stream:', err);
    next(err);
  });
};




class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 8000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }
  public listen() {
    // Set up Mongoose
    mongoose.connect(DATABASE_URL);
    mongoose.Promise = global.Promise;
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private 

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression())
    this.app.use(storeRawBodyMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
