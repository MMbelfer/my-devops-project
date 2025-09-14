const fetch = require('node-fetch');

// A - Describe the group of tests we are running.
// תיאור של קבוצת הבדיקות.
describe('Web Server Status', () => {

  // B - A single test case to check the database connection.
  // מקרה בדיקה בודד שבודק את החיבור לבסיס הנתונים.
  test('should connect to the database successfully', async () => {

    // C - Send a request to our web server.
    // שליחת בקשה לשרת האינטרנט.
    const response = await fetch('http://web:3000/status');
    const data = await response.json();

    // D - Check if the response matches what we expect.
    // בדיקה שהתגובה תואמת את הציפיות שלנו.
    expect(data.status).toBe('Database connection successful!');
  });
});