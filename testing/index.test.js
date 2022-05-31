const request = require('supertest')
const app = require('../src/index')



test('server is running' , async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
})

test('testing if data for fred is shown', async () => {
  const response = await request(app).get("/users")
  expect(response.type).toEqual('application/json')
  expect(response.text).toBe('{"email":"fred@example.com","features":["SuperCoolFeature","Simplified NavBar"]}')

})

test('testing to see if features shows a response', async () => {
  const response = await request(app).get("/features")
  console.log(response.body)
  expect(response.statusCode).toBe(200)
})

test('testing to see if value can be changed' , async () => {
  app.set('selectedUser','fred@example.com')
  const response = await request(app).get("/user")
  console.log(response.body)
})