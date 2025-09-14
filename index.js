// A- We need the 'express' library to create our web server.
// אנחנו משתמשים בספריית express כדי ליצור שרת אינטרנט.
const express = require('express');

// B- We need the 'mysql2' library to connect to the database.
// אנחנו צריכים את ספריית mysql2 כדי להתחבר לבסיס הנתונים.
const mysql = require('mysql2/promise');

// C- Create an express application.
// יוצרים יישום של express.
const app = express();
const port = 3000;

// D- Set up the database connection pool.
// הגדרת מאגר חיבורים לבסיס הנתונים.
const pool = mysql.createPool({
  host: 'db', // The name of the database service in docker-compose.yml
  user: 'root',
  password: 'password',
  database: 'my_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// E- A route to check the database connection.
// מסלול (route) לבדיקת החיבור לבסיס הנתונים.
app.get('/status', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1 as result;');
    connection.release();
    res.status(200).json({ status: 'Database connection successful!', result: rows });
  } catch (error) {
    res.status(500).json({ status: 'Database connection failed!', error: error.message });
  }
});

// F- Start the server.
// מפעילים את השרת.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});