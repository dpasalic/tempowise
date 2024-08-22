"use server";

import pool from "./db";

export async function findUserByEmail(email: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  return rows[0];
};

export async function findUserById(id: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

  return rows[0];
};

export async function insertUser(firstName: string, lastName: string, email: string, password: string) {
  const res = await pool.query("INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, 'user')", [firstName, lastName, email, password]);
};

export async function getTasksOfUser(userId: string) {
  const { rows } = await pool.query(`
    WITH task_aggregation AS (
      SELECT 
        day_of_week,
        ARRAY_AGG(
          json_build_object(
            'id', id,
            'title', title,
            'description', description,
            'start_minutes', start_minutes,
            'duration_minutes', duration_minutes
          ) ORDER BY start_minutes
        ) AS tasks
      FROM tasks
      WHERE user_id = ${userId}
      GROUP BY day_of_week
    )
    SELECT json_object_agg(day_of_week, tasks) AS tasks
    FROM task_aggregation;
  `);

  return rows;
}