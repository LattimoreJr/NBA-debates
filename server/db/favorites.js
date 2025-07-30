const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createFavorites = async (favorite) => {
    // Find the current highest order_rank for this user
    const maxRankResult = await client.query(
        `SELECT COALESCE(MAX(order_rank), -1) + 1 AS next_rank FROM favorites WHERE user_id = $1`,
        [favorite.user_id]
    );
    const nextRank = maxRankResult.rows[0].next_rank;

    const SQL =`
        INSERT INTO favorites (id, user_id, legend_id, order_rank)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const response = await client.query(SQL, [uuidv4(), favorite.user_id, favorite.legend_id, nextRank]);
    return response.rows[0];
}

const fetchFavorites = async (userId) => {
    const SQL = `
        SELECT legends.*
        FROM favorites
        JOIN legends
        ON favorites.legend_id = legends.id
        WHERE favorites.user_id = $1
        ORDER BY favorites.order_rank ASC
        LIMIT 10
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
}

const deleteFavorite = async (favorite) => {
    const SQL = `
        DELETE FROM favorites
        WHERE user_id = $1 AND legend_id = $2
        RETURNING *
    `;
    const response = await client.query(SQL, [favorite.user_id, favorite.legend_id]);
    return response.rows[0];
}

module.exports = {
    createFavorites,
    fetchFavorites,
    deleteFavorite
}