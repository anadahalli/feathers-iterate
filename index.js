module.exports = () => (app) => {
  app.mixins.push((service) => {
    service.iterate = async function * (params = {}) {
      params.query = params.query || {}

      let result = await service.find(params)

      // no pagination
      if (Array.isArray(result)) {
        yield * result

        return
      }

      if (Array.isArray(result.data)) {
        yield * result.data
      }

      while (result.total > (result.limit + result.skip)) {
        params.query.$limit = result.limit
        params.query.$skip = result.limit + result.skip

        result = await service.find(params)

        yield * result.data
      }
    }
  })
}
