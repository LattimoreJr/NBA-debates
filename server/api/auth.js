const express = require('express')
const router = express.Router()

const {
    authenticate
} = require('../db/auth')
const {
    isLoggedIn
} = require('./middleware')

router.post('/login', async (req, res, next) => {
        try {
            const token = await authenticate(req.body)
            res.send({token})
        } catch (error) {
            next(error)
        }
})

router.get('/me', isLoggedIn, (req, res, next) => {
        try {
            res.send(req.user)
        } catch (error) {
            next(error)
        }
})



module.exports = router