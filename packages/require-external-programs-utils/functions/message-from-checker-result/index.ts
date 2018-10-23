import { CheckCommandsResult } from 'require-external-programs-db'
import group from '../group-by-program'
import message from '../message-from-grouper'
export = (collection: CheckCommandsResult): string => message(group(collection))
