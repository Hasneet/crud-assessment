import ResponseHandler from '../utils/responsehandler.js';
import ProductService from '../services/v1/productService.js';

class ProductController {
    async save(req, res) {
        try {
            // request sanatization
            const {
                name,
                price
            } = req.body;
            if (!name) return new ResponseHandler.sendResponse(res, {}, 400, 'name is required');
            if (!price) return new ResponseHandler.sendResponse(res, {}, 400, 'price is required');
            if (name.trim().length === 0) return new ResponseHandler().sendResponse(res, {}, 400, 'name should not be empty');
            if (!/^\d+$/.test(price)) return new ResponseHandler().sendResponse(res, {}, 400, 'price must contain numbers only');
            const response = await new ProductService().save(name, price);
            if (response.success) {
                return new ResponseHandler().sendResponse(res, { productId: response.data.productId }, 201, response.message);
            }
            else return new ResponseHandler().sendResponse(res, {}, 400, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res, {}, 500, 'Something went wrong.');
        }
    }

    async update(req, res) {
        try {
            // request sanatization
            const {
                id,
                name,
                price
            } = req.body;
            if (!id) return new ResponseHandler().sendResponse(res, {}, 400, 'id is required');
            if (!/^\d+$/.test(id)) return new ResponseHandler.sendResponse(res, {}, 400, 'id must contain numbers only');
            if (!name && !price) return new ResponseHandler().sendResponse(res, {}, 400, 'nothing to update');
            if (name && name.trim().length === 0) return new ResponseHandler.sendResponse(res, {}, 400, 'name is required');
            if (price && !/^\d+$/.test(price)) return new ResponseHandler.sendResponse(res, {}, 400, 'price must contain numbers only');
            const response = await new ProductService().update(id, name, price);
            if (response.success) {
                return new ResponseHandler().sendResponse(res, {}, 200, response.message);
            }
            else return new ResponseHandler().sendResponse(res, {}, 400, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res, {}, 500, 'Something went wrong.');
        }
    }

    async get(req, res) {
        try {
            // request sanatization
            const {
                id,
            } = req.params;
            if (!id) return new ResponseHandler().sendResponse(res, {}, 400, 'id is required');
            if (!/^\d+$/.test(id)) return new ResponseHandler.sendResponse(res, {}, 400, 'id must contain numbers only');
            const response = await new ProductService().get(id);
            if (response.success) {
                return new ResponseHandler().sendResponse(res, response.data, 200, response.message);
            }
            else return new ResponseHandler().sendResponse(res, {}, 400, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res, {}, 500, 'Something went wrong.');
        }
    }

    async list(req, res) {
        try {
            const response = await new ProductService().list();
            if (response.success) {
                return new ResponseHandler().sendResponse(res, response.data, 200, response.message);
            }
            else return new ResponseHandler().sendResponse(res, {}, 400, response.message);
        }
        catch (err) {
            console.log(err);
            return new ResponseHandler().sendResponse(res, {}, 500, 'Something went wrong.');
        }
    }
}

export default ProductController;