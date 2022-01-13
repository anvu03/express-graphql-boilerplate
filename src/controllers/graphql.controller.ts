import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { Express } from 'express'
import { Controller } from './controller.js'
import { Server } from 'http'
import { createMasterSchema } from '../graphql/index.js'
import { Resolver } from '../graphql/resolvers/resolver.js'

export class GraphQlController implements Controller {
  constructor(
    private readonly resolvers: Resolver[]
  ) {}

  async use(app: Express, httpServer: Server): Promise<void> {
    const server = new ApolloServer({
      schema: createMasterSchema(this.resolvers),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()
    server.applyMiddleware({
      app,
    })
  }
}
