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
      WHERE user_id = $1
      GROUP BY day_of_week
    )
    SELECT json_object_agg(day_of_week, tasks) AS tasks
    FROM task_aggregation;
  `, [userId]);

  return rows;
}

export async function insertTask(userId: string, title: string, desc: string, startMinutes: number, durationMinutes: number, day: string) {
  await pool.query(`
    INSERT INTO tasks (user_id, title, description, start_minutes, duration_minutes, day_of_week)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `, [userId, title, desc, startMinutes, durationMinutes, day]);
}

export async function deleteTask(id: number) {
  await pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id]);
}

export async function updateUser(id: string, firstName: string, lastName: string, email: string) {
  const { rows } = await pool.query(`UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *;`, [firstName, lastName, email, id]);

  return rows[0];
}
export async function updateUserPassword(id: string, firstName: string, lastName: string, email: string, password: string) {
  const { rows } = await pool.query(`UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE id=$5 RETURNING *;`, [firstName, lastName, email, password, id]);

  return rows[0];
}

export async function getTasksOverview() {
  const { rows } = await pool.query(`
    SELECT 
      COUNT(*) AS total_tasks,
      SUM(duration_minutes) AS total_minutes,
      day_of_week,
      COUNT(*) FILTER (WHERE day_of_week IS NOT NULL) AS tasks_per_day
    FROM tasks
    GROUP BY day_of_week;  
  `);

  return rows;
}

export async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users;");

  return rows;
}

export async function removeUser(id: number) {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
}