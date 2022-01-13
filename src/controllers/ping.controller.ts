import { Express } from 'express'
import { Controller } from './controller.js'
import { Server } from 'http'

export class PingController implements Controller {
  async use(app: Express, _httpServer: Server): Promise<void> {
    app.use('/ping', (req, res) => {
      return res.json({
        status: 'ok',
      })
    })
  }
}
