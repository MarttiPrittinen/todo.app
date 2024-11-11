import { pool } from '../helper/db.js';

const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM task')
}

const insertTask = async (description) => {
    return await pool.query('INSERT INTO task (description) values ($1) returning *',[description])
}

export {selectAllTasks, insertTask}