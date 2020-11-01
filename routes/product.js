const router = require('express').Router()
const { getProducts, getProductById, deleteProduct,createProduct, updateProduct } = require('../controllers/product')

router.get('/', getProducts)
router.get('/:name', getProductById)
router.delete('/:id', deleteProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
   
module.exports = router  