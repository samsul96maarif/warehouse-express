/**
 * @author [Samsul Ma'arif]
 * @email [samsulma828@gmail.com]
 * @create date 2020-01-18 15:57:56
 * @modify date 2020-01-18 15:57:56
 * @desc [description]
 */

const controller_class = require('../Controllers/ProductController')
const router = require('express').Router()
const controller = new controller_class()

router.route('/total')
    .get(controller.getTotalProduct)

router.route('/')
    .get(controller.fetch)
    .post(controller.store);

router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)

 module.exports = router