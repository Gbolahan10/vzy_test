/// <reference types="node" />
import express from 'express';
import { Routes } from './src/interfaces/routes.interface';
declare global {
    namespace Express {
        interface Request {
            rawBody?: Buffer | string;
        }
    }
}
declare class App {
    app: express.Application;
    env: string;
    port: string | number;
    constructor(routes: Routes[]);
    listen(): void;
    getServer(): express.Application;
    private: any;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
}
export default App;
