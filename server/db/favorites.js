const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createFavorites = async (favorite) => {
    const SQL =`
        INSERT INTO favorites (id, user_id, legend_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(),favorite.user_id, favorite.legend_id])
    return response.rows[0]
}

const fetchFavorites = async (userId) => {
        const SQL = `
            SELECT *
            FROM favorites
            WHERE user_id = $1
        `
        const response = await client.query(SQL, [userId])
        return response.rows
}

const deleteFavorite = async (favorite) => {
        const SQL =`
            DELETE FROM favorites
            WHERE id = $1 and user_id = $2
        `
        await client.query(SQL, [favorite.id, favorite.user.id])
}

module.exports = {
    createFavorites,
    fetchFavorites,
    deleteFavorite
}