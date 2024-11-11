import { pool } from '../helper/db.js';

const insertUser = async (email, hashedpassword) => {
    return await pool.query('INSERT INTO account (email, password) values ($1, $2) returning *',[email, hashedpassword])
}

const selectUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM account WHERE email = $1',[email])
}

export {insertUser, selectUserByEmail}