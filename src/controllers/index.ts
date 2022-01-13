import { Express } from 'express'
import { ErrorController } from './error.controller.js'
import { PingController } from './ping.controller.js'
import { LoggingController } from './logging.controller.js'
import { GraphQlController } from './graphql.controller.js'
import { Server } from 'http'
import { Resolver } from '../graphql/resolvers/resolver.js'
import { ServiceContainer } from '../services/index.js'

export function initControllers(
  app: Express,
  httpServer: Server,
  services: ServiceContainer,
  resolvers: Resolver[]
): void {
  const { logger } = services
  const logging = new LoggingController(logger)
  const error = new ErrorController(logger)
  const ping = new PingController()
  const graphql = new GraphQlController(resolvers)

  logging.use(app, httpServer)
  ping.use(app, httpServer)
  error.use(app, httpServer)
  graphql.use(app, httpServer)
}
