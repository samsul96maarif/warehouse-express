/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2021.
 */

exports.check = (req_data) => {
    try{
        if (!req_data.hasOwnProperty('name') || req_data.name === '') throw 'Nama harus diisi!'
        if (!req_data.hasOwnProperty('price') || req_data.price === '') throw 'Harga harus diisi!'
        if (isNaN(req_data.price)) throw 'Harga harus bernilai angka !'
        return true
    }catch (e){
        throw e
    }
}