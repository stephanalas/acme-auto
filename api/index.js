const router = require('express').Router();
const {  models: { User, Car, Sale } } = require('../db');
const express = require('express');
const app = express();

router.get('/users', async(req, res, next) => {
    try {
        res.send(await User.findAll())
    } catch (error) {
        next(error)
    }
})

router.get('/cars', async(req, res, next) => {
    try {
        res.send(await Car.findAll())
    } catch (error) {
        next(error)
    }
})

router.get('/users/:id/sales', async(req, res, next) => {
    try {
        res.send(await Sale.findAll({
            where: {
                userId: req.params.id
            },
            include: [ Car ]
        }))
    } catch (error) {
        next(error)
    }
})


module.exports = router;