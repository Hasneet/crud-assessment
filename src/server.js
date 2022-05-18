import express from 'express';
import routes from './routes/index.js';

class Server {
    constructor(app) {
        this.app = app;
        this.port = process.env.PORT || 3000;
        this.init();
    }

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.get('/', (req, res) => {
            return new ResponseHandler().sendResponse(res, { status: 'OK', server: process.env.NODE_ENV }, 200, 'CRUD v1.0.0');
        })
        this.app.use('/', routes);
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }

    errorHandler(req, res) {
        return new ResponseHandler().sendResponse(res, {}, 500, 'Something went wrong');
    }

    routeNotFound(req, res) {
        return new ResponseHandler().sendResponse(res, {}, 404, 'Resource not found');
    }
}
export default Server;