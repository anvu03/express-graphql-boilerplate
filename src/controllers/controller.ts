import { Express } from 'express'
import { Server } from 'http'

export interface Controller {
  use(app: Express, httpServer: Server): Promise<void>
}
