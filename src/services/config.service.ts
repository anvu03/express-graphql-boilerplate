import { ConfigError } from '../../utility/errors/index.js'

export interface Config {
  jwt: any
  mongoConnectionString: string
}

export class ConfigService implements Config {
  mongoConnectionString: string
  jwt: {
    privateKey: string,
    issuer: string,
    expires: number,
    audience: string
  }

  private readonly values: Record<string, string>[]

  constructor(...values: Record<string, string>[]) {
    this.values = values

    this.mongoConnectionString = this.readRequiredString('MONGO_CONNECTION_STRING')
    this.jwt = {
      audience: 'salebooster.com',
      expires: 60,
      issuer: 'api.salebooster.com',
      privateKey: 'fheuwfi32ffh32fuhke'
    }
  }

  public readString(
    key: string,
    defaultValue: string | undefined
  ): string | undefined {
    return this.values.map((v) => v[key]).find((v) => v) ?? defaultValue
  }

  public readRequiredString(key: string): string {
    const value = this.values.map((v) => v[key]).find((v) => v)
    if (!value) {
      throw new ConfigError(key, undefined)
    }
    return value
  }
}
