const port = process.env.PORT || 3000
// const logger = require('./logger.js')
// const database = require('./database/createDatabase.js')({ logger })
const app = require('./createExpressApp.js')()
const server = require('http').createServer()
server
    .on('request', app)
    .on('listening', function() {
        const addr = this.address()
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
        console.log(`listening on port: ${port}`)
    }).listen(port)