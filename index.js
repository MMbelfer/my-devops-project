const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'my_app'
};

// A simple endpoint that performs a calculation with the database
app.get('/calculate', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT 2 + 2 AS result;');
    connection.end();
    
    const result = rows[0].result;
    console.log(`Calculation result from DB: ${result}`);
    res.status(200).json({ result: result });
  } catch (error) {
    console.error('Failed to connect or query database:', error.message);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});