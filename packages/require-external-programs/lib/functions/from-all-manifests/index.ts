import { Result } from '../../classes'
import getAllManifests from '../all-manifests'
import loadFromManifests from '../from-manifests'

export = (dirname: string): Promise<Result> =>
  getAllManifests(dirname).then(loadFromManifests)
