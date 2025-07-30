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

router.post('/:legendId', isLoggedIn, async (req, res, next) => {
    try {
        const favorite = await createFavorites({ 
            user_id: req.user.id, 
            legend_id: req.params.legendId 
        });
        res.status(201).send(favorite);
    } catch (error) {
        next(error);
    }
});


const client = require('../db/client');

router.put('/reorder', isLoggedIn, async (req, res, next) => {
    try {
        const { favorites } = req.body; 
        if (!favorites || !Array.isArray(favorites)) {
            return res.status(400).send({ error: "Invalid favorites payload" });
        }

        for (const fav of favorites) {
            
            const result = await client.query(
                `UPDATE favorites
                 SET order_rank = $1
                 WHERE user_id = $2 AND legend_id = $3
                 RETURNING *`,
                [fav.order_rank, req.user.id, fav.legend_id]
            );
            if (result.rowCount === 0) {
                console.warn(`No favorite found for legend_id=${fav.legend_id}`);
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating favorite order:", error.message);
        next(error);
    }
});

router.delete('/:legendId', isLoggedIn, async (req, res, next) => {
    try {
        const deleted = await deleteFavorite({
            user_id: req.user.id,
            legend_id: req.params.legendId
        });
        if (!deleted) {
            return res.status(404).send({ error: "Favorite not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router