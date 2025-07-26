const express = require('express')
const router = express.Router()

const {
    isLoggedIn
} = require('./middleware')
const {
    fetchFavorites,
    createFavorites,
    deleteFavorite
} = require('../db/favorites')


router.get('/', isLoggedIn, async (req, res, next) => {
        try {
            res.send(await fetchFavorites(req.user.id))
        } catch (error) {
            next(error)
        }
})

router.post('/', isLoggedIn, async (req, res, next) => {
        try {
            res.send(await createFavorites(req.body))
        } catch (error) {
            next(error)
        }
})

router.delete('/:fav_id', isLoggedIn, async (req, res, next) => {
    try {
        await deleteFavorite({ id: req.params.fav_id, user_id: req.user.id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router