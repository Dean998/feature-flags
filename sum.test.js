const sum = require('./sum');
const request = require('supertest')

const app = require('./src/index')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('server is running' , async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
    
})