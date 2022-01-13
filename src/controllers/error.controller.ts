import { Express, NextFunction, Request, Response } from 'express'
import { Controller } from './controller.js'
import { Logger } from 'winston'
import { Server } from 'http'

export class ErrorController implements Controller {
  /**
   *
   */
  constructor(private readonly logger: Logger) {}

  async use(app: Express, _httpServer: Server): Promise<void> {
    app.use(this.handleError.bind(this))
  }

  handleError(err: Error, req: Request, res: Response, _next: NextFunction) {
    const { statusCode } = res
    const { method, originalUrl } = req

    this.logger.error(err.message, {
      statusCode,
      method,
      originalUrl,
    })
  }
}
