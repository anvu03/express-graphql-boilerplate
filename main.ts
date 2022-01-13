import express from 'express'
import winston from 'winston'
import dotenv from 'dotenv'
import sourceMapSupport from 'source-map-support'
import http from 'http'
import cors from 'cors'
import { ConfigService, initServices } from './src/services/index.js'
import { initControllers } from './src/controllers/index.js'
import { initManagers } from './src/managers/index.js'
import { initResolvers } from './src/graphql/index.js'

sourceMapSupport.install()

const { parsed } = dotenv.config()

const logger = winston.createLogger({
  level: process.env.MINIMUM_LOG_LEVEL ?? 'debug',
  format: winston.format.json(),
  transports: [],
})

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}


const app = express()
app.use(cors())
const httpServer = http.createServer(app)
const port = process.env.PORT ?? 8000
const appName = process.env.APP_NAME ?? 'appName'

const configService = new ConfigService(parsed as any, process.env as any)
const services = await initServices(configService, logger)
const managers = await initManagers(logger, services.db)
const resolvers = initResolvers(logger, services, managers)
initControllers(app, httpServer, services, resolvers)

httpServer.listen(port, () => {
  logger.info(`${appName} is running on port ${port}...`)
})
