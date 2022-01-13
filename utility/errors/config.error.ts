export class ConfigError extends Error {
  constructor(key: string, value: unknown) {
    super(
      `Unable to resolve config key ${key} with value ${value}`
    )
  }
}
