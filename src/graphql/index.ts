import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'apollo-server-core'
import lodash from 'lodash'
import { Logger } from 'winston'
import { Resolver } from './resolvers/resolver.js'
const { merge } = lodash
import { VoidTypeDefinition } from 'graphql-scalars';
import { ServiceContainer } from '../services/index.js'

export * from './resolvers/resolver.js'

const Query = gql`
  type Query {
    _query: String
  }
`

const Mutation = gql`
  type Mutation {
    _mutation(value: Int): Int
  }
`

const defaultResolvers = {
  Query: {
    _query: () => 'Hello world!',
  },
  Mutation: {
    _mutation: (_: unknown, arg: { value: number }) => arg.value,
  },
}

export function createMasterSchema(resolvers: Resolver[]) {
  return makeExecutableSchema({
    typeDefs: [Query, Mutation, ...resolvers.map((x) => x.typeDef), VoidTypeDefinition],
    resolvers: merge([defaultResolvers, ...resolvers.map((x) => x.resolvers)]),
  })
}

export function initResolvers(logger: Logger, services: ServiceContainer, managers: {}) {
  return []
}
