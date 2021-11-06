/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2021.
 */

class BaseController {
    constructor(model, validator, available_args = []) {
        this.model = model
        this.validator = validator
        this.availabelArgs = available_args
    }

    getModel = () => new this.model()

    fetch = async(req, res) => {
        try {
            let model = this.getModel()
            let args = {}
            this.availabelArgs.forEach((val, i, arr) => {
                if (req.body[val]) args[val] = req.body[val]
            })
            const data = await model.getWhere(args)
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

    store = async(req, res) => {
        try {
            this.validator.check(req.body)
            let model = this.getModel()
            console.log('req body ',req.body)
            const data = await model.store(req.body)
            res.json({
                status: 201,
                message: 'success',
            })
        }catch (e){
            res.json({
                status: 400,
                message: e.hasOwnProperty('message') ? e.message : e
            })
        }
    }

    getById = async(req, res) => {
        try {
            let model = this.getModel()
            const data = await model.getById(req.params.id)
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

    update = async(req, res) => {
        try {
            if (!req.params.hasOwnProperty('id') || req.params?.id === '') throw "Id harus diisi !"
            this.validator.check(req.body)
            let model = this.getModel()
            const data = await model.update(req.params.id, req.body)
            res.json({
                status: 202,
                message: 'success',
            })
        }catch (e){
            res.json({
                status: 400,
                message: e.hasOwnProperty('message') ? e.message : e
            })
        }
    }

    delete = async(req, res) => {
        try {
            if (!req.params.hasOwnProperty('id') || req.params?.id === '') throw "Id harus diisi !"
            let model = this.getModel()
            const data = await model.delete(req.params.id)
            res.json({
                status: 204,
                message: 'success',
            })
        }catch (e){
            res.json({
                status: 400,
                message: e.hasOwnProperty('message') ? e.message : e
            })
        }
    }
}

module.exports = BaseController