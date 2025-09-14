const fetch = require('node-fetch');

describe('Web Server and Database Communication', () => {
  test('should return 4 from the calculation endpoint', async () => {
    // The fetch request points to the web service name and port as defined in docker-compose.yml
    const response = await fetch('http://web:3000/calculate');
    const data = await response.json();
    
    // We expect the result from the server to be 4
    expect(data.result).toBe(4);
  });
});