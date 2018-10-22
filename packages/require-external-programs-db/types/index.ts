export type CheckCommandsResult = ReadonlySet<CheckCommandsResult.Item>

export namespace CheckCommandsResult {
  export interface Item {
    readonly manifest: string
    readonly program: string
  }
}
