const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const findUserByToken = async (token) => {
    try {
        if (!process.env.JWT) {
            console.error('JWT secret is not defined in environment variables.');
            throw new Error('JWT secret not configured');
        }
        if (token.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '');
        }
        const payload = jwt.verify(token, process.env.JWT);

        const SQL = `
            SELECT id, username, is_admin AS "isAdmin"
            FROM users
            WHERE id = $1
        `;
        const response = await client.query(SQL, [payload.id]);
        if (!response.rows.length) {
            const error = Error('user not found');
            error.status = 401;
            throw error;
        }
        return response.rows[0];
    } catch (error) {
        console.error("Error in findUserByToken:", error.message);
        const er = Error('bad token');
        er.status = 401;
        throw er;
    }
}

const authenticate = async (credentials) => {
    if (!credentials || !credentials.username || !credentials.password) {
        const error = new Error('username and password required');
        error.status = 400;
        throw error;
    }
    const SQL = `
        SELECT id, password, is_admin AS "isAdmin"
        FROM users
        WHERE username = $1
    `
    const response = await client.query(SQL, [credentials.username])
    if (!response.rows.length) {
        const error = Error('user not found')
        error.status = 401;
        throw error
    }
    const valid = await bcrypt.compare(credentials.password, response.rows[0].password)
    if(!valid){
        const error = Error('incorrect password')
        error.status = 401;
        throw error
    }
    if (!process.env.JWT) {
        console.error('JWT secret is not defined in environment variables.');
        throw new Error('JWT secret not configured');
    }
    const token = await jwt.sign({id: response.rows[0].id, isAdmin: response.rows[0].isAdmin}, process.env.JWT)
    return {token}
}

module.exports = {
    findUserByToken,
    authenticate
}