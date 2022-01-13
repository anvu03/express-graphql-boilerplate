import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { ErrorCode } from './error-code.enum.js'

export class RichError extends Error {
  /**
   *
   */
  constructor(
    message: string,
    public readonly statusCode: StatusCodes,
    public readonly reasonPhrase: ReasonPhrases,
    public readonly ErrorCode: ErrorCode,
    public readonly details?: SerializableRecord
  ) {
    super(message)
  }
}

export type SerializableRecord = Record<
  string,
  string | number | boolean | Date | SerializableRecord
>[]
