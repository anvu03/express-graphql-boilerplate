import { Logger } from 'winston'
import { ConfigService } from './config.service.js'
import { MongoDbService } from './mongodb.service.js'

export * from './mongodb.service.js'
export * from './config.service.js'

export interface ServiceContainer {
  logger: Logger
  db: MongoDbService
}

export async function initServices(configService: ConfigService, logger: Logger): Promise<ServiceContainer> {
  const db = new MongoDbService(configService)
  await db.init()
  logger.info('mongodb initialized')
  return {
    db,
    logger,
  }
}
