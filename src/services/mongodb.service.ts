import { MongoClient, MongoClientOptions } from 'mongodb'
import { ConfigService } from './config.service.js'

export interface DbService {
}

export class MongoDbService implements DbService {
  private client!: MongoClient
  /**
   * Collections defined here
   */

  constructor(private readonly config?: ConfigService) {}

  public async init(
    client: MongoClient | undefined = undefined
  ): Promise<void> {
    if (!client) {
      const mongoConnectionString = this.config?.mongoConnectionString ?? 'mongodb://localhost'
      this.client = await new MongoClient(
        mongoConnectionString,
        this.loadConfig()
      ).connect()
    } else {
      this.client = client
    }
    const db = this.client.db('sale-booster')

    /**
     * Set collection here
     * Ex: this.collection = db.collection('collectionName')
     */
  }

  public async stop(): Promise<void> {
    await this.client.close()
  }

  loadConfig(): MongoClientOptions {
    if (process.env.HOSTING_ENV === 'local') {
      return { useUnifiedTopology: true } as MongoClientOptions
    } else {
      return {}
    }
  }
}
