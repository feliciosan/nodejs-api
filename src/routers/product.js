const ProductController = require('../controllers/product');

const product = (router, auth) => {
    router.post('/products', auth, (req, res) => ProductController.create(req, res));
    router.get('/products', auth, (req, res) => ProductController.findAll(req, res));
    router.put('/products/:id', auth, (req, res) => ProductController.update(req, res));
    router.delete('/products/:id', auth, (req, res) => ProductController.remove(req, res));

    return router;
};

module.exports = product;
