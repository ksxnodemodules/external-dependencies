import { CheckCommandsResult } from 'require-external-programs-db'
import { GroupRoleAssigner } from '../../types'
import { Grouper } from '../../classes'

function groupByManifest (role: GroupRoleAssigner, collection: CheckCommandsResult) {
  const group = new Grouper<string, string>()

  for (const item of collection) {
    group.addMember(...role(item))
  }

  return group
}

export = groupByManifest
