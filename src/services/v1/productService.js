// using global database "database"
class ProcutService {
    async save(name, price) {
        try {
            name = name.toLowerCase();
            let productArr = database.products.list.filter(product => product.name === name);
            if (productArr.length > 0) return { success: false, data: {}, message: `Product with name '${name}'already exists` };
            let product = {
                id: database.products.list.length + 1,
                name,
                price // assuming price in dollars, the idea is to have a seperate table for currency conversion keeping dollar as the base unit for conversion.
            };
            database.products.list.push(product);
            return { success: true, data: { productId: product.id }, message: 'Product added successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    async update(id, name, price) {
        try {
            name = name.toLowerCase();
            let productArr = database.products.list.filter(product => product.id == id);
            if (productArr.length === 0) return { success: false, data: {}, message: `id not found` };
            if (name) {
                productArr = database.products.list.filter(product => product.name === name && product.id !== id);
                if (productArr.length > 0) return { success: false, data: {}, message: `product with name '${name}'already exists` };
            }
            for (let index in database.products.list) {
                if (database.products.list[index].id == id) {
                    database.products.list[index].name = name ? name : database.products.list[index].name;
                    database.products.list[index].price = price ? price : database.products.list[index].price;
                }
            }
            return { success: true, data: {}, message: 'product updated successfully' };
        }
        catch (err) {
            throw err;
        }
    }

    get(id) {
        try {
            let productArr = database.products.list.filter(product => product.id == id);
            return { success: true, data: {product: productArr[0] || {} }, message: 'product fetched successfully' };
        }
        catch(err) {
            throw err;
        }
    }

    list() {
        try {
            let productsArr = database.products.list;
            return { success: true, data: { products: productsArr }, message: 'products fetched successfully' };
        }
        catch (err) {
            throw err;
        }
    }
}
export default ProcutService;