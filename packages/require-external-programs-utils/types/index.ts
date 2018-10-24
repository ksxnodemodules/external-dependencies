import { CheckCommandsResult } from 'require-external-programs-db'

export type GroupRoleAssigner =
  (item: CheckCommandsResult.Item) => [string, string]

export type ExaminationResult =
  ExaminationResult.Satisfied |
  ExaminationResult.Unsatisfied |
  ExaminationResult.Error

export namespace ExaminationResult {
  export interface Satisfied {
    readonly satisfied: true
    readonly error: false
  }

  export interface Unsatisfied {
    readonly satisfied: false
    readonly error: false
    readonly response: string
  }

  export interface Error {
    readonly satisfied: false
    readonly error: true
    readonly response: any
  }
}
