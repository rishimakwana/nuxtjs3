import { createRouter, defineEventHandler, useBase } from 'h3'
import product from '~/server/controllers/productController'

const router = createRouter()

router.get('/getAll', defineEventHandler(product.getAll))

router.get('/*', defineEventHandler((event:any) => { throw createError({
    statusCode: 400,
    statusMessage: 'Page not found',
    stack: "Page not found",
  })}));
router.post('/save', defineEventHandler(product.save))

export default useBase('/api/product', router.handler)