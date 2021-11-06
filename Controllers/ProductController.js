/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2021.
 */

const BaseController = require("./BaseController")
let Model = require('../Database/Models/Product')
let validator = require("../Validators/ProductValidation")

class ProductController extends BaseController{
    constructor() {
        super(Model, validator, ['name', 'price']);
    }

    getTotalProduct = async(req, res) => {
        try {
            let model = this.getModel()
            let price = 0
            if(req.body.hasOwnProperty('min')){
                price = req.body.min
            } else if(req.query.hasOwnProperty('min')){
                price = req.body.query
            }
            const data = await model.getTotalProductByMinPrice(price)
            res.status(200)
            res.json({
                status: 200,
                message: 'success',
                data: data
            })
        }catch (e){
            res.json({
                status: 400,
                message: e.hasOwnProperty('message') ? e.message : e
            })
        }
    }
}

module.exports = ProductController