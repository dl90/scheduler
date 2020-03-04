const request = require('supertest')
const database = require('./testDatabase')
const app = require('../app')(database)
const { queryByText } = require('@testing-library/dom')
const { JSDOM }  = require('jsdom')

// Turn off shouldFail before each test.
beforeEach(() => {
  database.shouldFail = false
})

describe('/api/messages', () => {
  test('should return all messages returned from the database', (done) => {
    request(app).get('/api/messages').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual(database.messages)
      done()
    })
  })

  describe('error', () => {
    test('should respond with 500 error', (done) => {
      database.shouldFail = true
      request(app).get('/api/messages').then((response) => {
        expect(response.statusCode).toBe(500)
        done()
      })
    })
  })
})

// 1
describe('/messages', () => {
  test('should render all messages returned from the database', (done) => {
      request(app).get('/messages').then((response) => { 
          expect(response.statusCode).toBe(200)
          
          // 2
          const fakeDom = new JSDOM(response.text)
          const document = fakeDom.window.document

          database.messages.forEach(message => {
            console.log(message.content)
            // new RegExp(`.*${message.content}.*`
            const htmlMessages = queryByText(document.body, new RegExp(`.*${message.content}.*`)) // 3
            expect(htmlMessages).toBeTruthy() 
          })

          done()
      })
  })
})