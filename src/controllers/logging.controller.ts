import { Express, NextFunction, Request, Response } from 'express'
import { Logger } from 'winston'
import { Controller } from './controller.js'
import { Server } from 'http'

export class LoggingController implements Controller {
  readonly excludedRoutes = ['/ping']

  constructor(private readonly logger: Logger) {
  }

  async use(app: Express, _httpServer: Server): Promise<void> {
    app.use(this.logging.bind(this))
  }

  logging(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req
    const { pathname } = new URL(`http://localhost${originalUrl}`)

    if (this.excludedRoutes.includes(pathname)) {
      return next()
    }

    try {
      const start = new Date()
      res.once('finish', () => {
        const end = new Date()

        this.logger.info(pathname, {
          duration: end.valueOf() - start.valueOf(),
          method,
        })
      })
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
