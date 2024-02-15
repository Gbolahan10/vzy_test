declare class DatabaseService {
    private readonly Model;
    constructor(Model: any);
    create(payload: any): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    find(query: any): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    findAll(query?: any, page?: any, limit?: any): Promise<{
        status: boolean;
        result: any;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
        result?: undefined;
    }>;
    update(query: any, payload: any): Promise<{
        status: boolean;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
    }>;
    delete(query: any): Promise<{
        status: boolean;
        error?: undefined;
    } | {
        status: boolean;
        error: any;
    }>;
}
export default DatabaseService;
