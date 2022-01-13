import { DocumentNode } from 'graphql'
export interface Resolver {
  typeDef: DocumentNode
  resolvers: {
    Query?: Record<string, ResolverFunction>
    Mutation?: Record<string, ResolverFunction>
  }
}

export type ResolverFunction = (
  parent: any,
  args: any,
  context: any,
  info: any
) => any
