const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4
const bcrypt = require('bcrypt')

const createUsers = async (user) => {
        if(!user.username.trim() || !user.password.trim()){
            throw Error('must have username and password')
        }
        user.password = await bcrypt.hash(user.password, 5)
        const SQL = `
            INSERT INTO users (id, username, password, is_admin)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `
        const response = await client.query(SQL, [uuidv4(), user.username, user.password, user.is_admin])
        return response.rows[0]
}

const fetchUsers = async () => {
        const SQL = `
            SELECT *
            FROM users
        `
        const response = await client.query(SQL)
        return response.rows
}

const fetchUserById = async (id) => {
    const SQL = `
        SELECT *
        FROM users
        WHERE id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

const fetchFavoritesByUserId = async (userId) => {
    const SQL = `
        SELECT nba_legends.*
        FROM favorites
        JOIN nba_legends ON favorites.legend_id = nba_legends.id
        WHERE favorites.user_id = $1
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
};

module.exports = {
    createUsers,
    fetchUsers,
    fetchUserById,
    fetchFavoritesByUserId
}