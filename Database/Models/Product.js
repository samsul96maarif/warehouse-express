/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2021.
 */

const BaseModel = require("./BaseModel")
const db = require("../Connection");

class Product extends BaseModel{
    constructor() {
        super('products', ['name', 'price'], true);
    }

    async getTotalProductByMinPrice(min_price = 0) {
        try {
            let sql = `SELECT COUNT(${this.id}) as total FROM ${this.tableName} WHERE price > ${min_price}`
            if (this.usingSoftDelete) sql += ` AND deleted_at IS NULL`
            let promise = new Promise((resolve, reject) => {
                db.query(sql, (err, data, fields) => {
                    if (err) reject(err)
                    resolve(data[0].total)
                })
            })

            const data = await promise
            return data
        } catch (e) {
            throw e
        }
    }
}

module.exports = Product