const router = require('express').Router()
const { getProducts, getProductByName, deleteProduct,createProduct, updateProduct } = require('../controllers/product')

router.get('/', getProducts)
router.get('/:name', getProductByName)
router.delete('/:id', deleteProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
   
module.exports = router  