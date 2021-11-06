/*
 * Copyright (c) 2020.
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 */

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const IS_PASSWORD_HASHED = false // menentukan apakah password dihash atau gk
let userObj = (id = '', password = '') => {
    return {id:id, password: password}
}
let Users = [userObj(1, 'localhost')] // untuk menyimpan users
exports.login = async(req, res) => {
    try{
        let data = userObj()
        if(!req.body.id || !req.body.password){
            throw "id dan password harus diisi";
        } else {
            console.log("users : ", Users)
            data = Users.find( user => {
                if (IS_PASSWORD_HASHED){
                    if (bcrypt.compareSync(req.body.password, user.password) && user.id === req.body.id) return user
                } else {
                    if(user.id === req.body.id && user.password === req.body.password) return user
                }
                throw "password atau id yang anda masukkan salah";
            });
        }
        res.status(200)
        res.json({
            status: 200,
            message: 'success',
            data: data
        })
    }catch (e){
        res.status(400)
        res.json({
            status: 400,
            message: e.hasOwnProperty('message') ? e.message : e
        })
    }
}

exports.register = async(req, res) => {
    try {
        let newUser = userObj()
        if(!req.body.id || !req.body.password){
            throw "id dan password harus diisi";
        } else {
            Users.filter(function(user){
                if(user.id === req.body.id) throw "User Already Exists! Login or choose another user id";
            });
            let pass = IS_PASSWORD_HASHED ? bcrypt.hashSync(req.body.password, salt) : req.body.password
            req.body = Object.assign(req.body, { password: pass })
            newUser.id = req.body.id
            newUser.password = pass
            Users.push(newUser);
        }
        res.status(201)
        res.json({
            status: 201,
            message: 'success',
            data: newUser
        })
    }catch (e){
        res.json({
            status: 400,
            message: e.hasOwnProperty('message') ? e.message : e
        })
    }
}