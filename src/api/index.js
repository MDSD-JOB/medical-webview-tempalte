const Apis = {}

const context = require.context('./', true, /\.js$/)
const req = context => {
  return context.keys().map(item => ({
    name: item.replace(/(.*\/)*([^.]+).*/gi, '$2'),
    apis: context(item)
  }))
}
const options = req(context)
options.forEach(option => {
  Object.assign(Apis, {
    [option.name]: { ...option.apis.default }
  })
})

export default Apis
