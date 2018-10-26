import * as xjest from 'extra-jest'
import * as fsTreeUtils from 'fs-tree-utils'
import { KEYWORD, KEYNAME, ManifestContent } from 'require-external-programs-lib'

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
          peerDependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'abc',
            'def'
          ]
        }),

        'abc-ghi': virpkg({
          name: 'abc-ghi',
          peerDependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'abc',
            'ghi'
          ]
        }),

        'jkl': virpkg({
          name: 'jkl',
          peerDependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'jkl'
          ]
        }),

        'skipped': virpkg({
          name: 'skipped',
          peerDependencies: {
            [KEYWORD]: '*'
          }
        })
      }
    },

    invalid: {
      'missing-dependency-in-peer': {
        'foo': virpkg({
          name: 'foo',
          peerDependencies: {},
          [KEYNAME]: [
            'hello'
          ]
        })
      },

      'missing-field-of-peer': {
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
          peerDependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: 'hello' as any
        })
      },

      'found-dependency-in-prod': {
        'qux': virpkg({
          name: 'qux',
          dependencies: {
            [KEYWORD]: '*'
          },
          peerDependencies: {
            [KEYWORD]: '*'
          }
        })
      },
    }
  }, container)
}

export = createFactory
