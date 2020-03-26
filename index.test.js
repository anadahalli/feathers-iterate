/* global test, expect */
const feathers = require('@feathersjs/feathers')
const memory = require('feathers-memory')

const iterate = require('./index')

test('Adds .iterate() service method', async () => {
  const options = {
    multi: true,
    // paginate: false,
    paginate: {
      default: 5,
      max: 10
    }
  }

  const app = feathers()
  app.configure(iterate())
  app.use('/messages', memory(options))

  const service = app.service('messages')

  const messages = []

  Array.from({ length: 100 }, (_, id) => {
    messages.push({
      id,
      text: `message ${id}`
    })
  })

  await service.create(messages)

  const generator = service.iterate()

  const result = []

  for await (const data of generator) {
    result.push(data)
  }

  expect(result).toEqual(messages)
})
