const express = require('express')
const router = express.Router()

const {
  fetchUsers,
  fetchUserById, 
  fetchFavoritesByUserId,
  createUsers
} = require('../db/users')

const {
    isLoggedIn,
    isAdmin
} = require('./middleware')

router.get('/', isLoggedIn, async (req, res, next) => {
        try {
            res.send(await fetchUsers())
        } catch (error) {
            next(error)
        }
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const user = await fetchUserById(req.params.id);
    if (!user) return res.status(404).send({ error: 'User not found' });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/favorites', isLoggedIn, async (req, res, next) => {
  try {
    const favorites = await fetchFavoritesByUserId(req.params.id);
    res.send(favorites);
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
    try {
      res.send(await createUsers(req.body))
    } catch (error) {
      next(error)
    }
})

module.exports = router