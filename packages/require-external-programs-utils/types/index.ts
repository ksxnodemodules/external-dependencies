import { CheckCommandsResult } from 'require-external-programs-db'

export type GroupRoleAssigner =
  (item: CheckCommandsResult.Item) => [string, string]
