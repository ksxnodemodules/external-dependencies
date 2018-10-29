import * as xjest from 'extra-jest'
import * as fsTreeUtils from 'fs-tree-utils'
import { KEYWORD, KEYNAME, ManifestContent } from 'require-external-programs-lib'
import { SATISFIES_ALL, UNSATISFIES_ALL } from '../__mocks__/semver/data'

const virpkg =
  <Manifest extends Partial<ManifestContent>, Rest extends fsTreeUtils.Tree.Write.Object>
    (manifest: Manifest, rest?: Rest) =>
      Object.assign({
        'package.json': JSON.stringify(manifest, undefined, 2)
      }, rest)

function createFactory (container?: string) {
  return xjest.setupTeardown.virtualEnvironment.createFactory({
    valid: {
      node_modules: {
        'abc-def': virpkg({
          name: 'abc-def',
          dependencies: {
            [KEYWORD]: SATISFIES_ALL
          },
          [KEYNAME]: [
            'abc',
            'def'
          ]
        }),

        'abc-ghi': virpkg({
          name: 'abc-ghi',
          devDependencies: {
            [KEYWORD]: SATISFIES_ALL
          },
          [KEYNAME]: [
            'abc',
            'ghi'
          ]
        }),

        'jkl': virpkg({
          name: 'jkl',
          dependencies: {
            [KEYWORD]: SATISFIES_ALL
          },
          [KEYNAME]: [
            'jkl'
          ]
        }),

        'missing-activation-key': virpkg({
          name: 'missing-activation-key',
          devDependencies: {
            [KEYWORD]: SATISFIES_ALL
          }
        }),

        'mismatched-version': virpkg({
          name: 'mismatched-version',
          dependencies: {
            [KEYWORD]: UNSATISFIES_ALL
          },
          [KEYNAME]: [
            'hello'
          ]
        })
      }
    },

    invalid: {
      'missing-field-in-dependency-dict': {
        'foo': virpkg({
          name: 'foo',
          dependencies: {},
          devDependencies: {},
          [KEYNAME]: [
            'hello'
          ]
        })
      },

      'lack-dependency-dicts': {
        'bar': virpkg({
          name: 'bar',
          [KEYNAME]: [
            'hello'
          ]
        })
      },

      'not-an-array': {
        'baz': virpkg({
          name: 'bar',
          dependencies: {
            [KEYWORD]: SATISFIES_ALL
          },
          [KEYNAME]: 'hello' as any
        })
      },

      'found-dependency-in-peer': {
        'qux': virpkg({
          name: 'qux',
          dependencies: {
            [KEYWORD]: SATISFIES_ALL
          },
          peerDependencies: {
            [KEYWORD]: SATISFIES_ALL
          }
        })
      }
    }
  }, container)
}

export = createFactory
