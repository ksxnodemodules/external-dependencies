import { CheckCommandsResult } from 'require-external-programs-db'
import { Grouper } from '../../classes'
import group from '../group'

export =
  (collection: CheckCommandsResult): Grouper<string, string> =>
    group(x => [x.manifest, x.program], collection)
