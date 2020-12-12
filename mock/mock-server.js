const chokidar = require('chokidar')
const bodyParser = require('koa-bodyparser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const koaRouter = require('koa-router');
const router = new koaRouter()

const mockDir = path.join(process.cwd(), 'mock')

/**
 * 
 * @param {import('koa')} app 
 */
function registerRoutes(app) {
   let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {

    router[mock.type](mock.url, mock.response)
     mockLastIndex = router.stack.length
  }


  app.use(router.routes())
  app.use(router.allowedMethods())
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
     mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${''}${url}`),
    type: type || 'get',
    response(ctx) {
      console.log('request invoke:' + ctx.path)
      ctx.body = (Mock.mock(respond instanceof Function ? respond(ctx.request) : respond))
    }
  }
}
/** @type import('vite').ServerPlugin */
module.exports = ({ app }) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser())

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
    var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
     router.stack.splice(mockStartIndex, mockRoutesLength)
        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
         mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
