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
          dependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'abc',
            'def'
          ]
        }),

        'abc-ghi': virpkg({
          name: 'abc-ghi',
          devDependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'abc',
            'ghi'
          ]
        }),

        'jkl': virpkg({
          name: 'jkl',
          dependencies: {
            [KEYWORD]: '*'
          },
          [KEYNAME]: [
            'jkl'
          ]
        }),

        'missing-activation-key': virpkg({
          name: 'missing-activation-key',
          devDependencies: {
            [KEYWORD]: '*'
          }
        }),

        'mismatched-version': virpkg({
          name: 'mismatched-version',
          dependencies: {
            [KEYWORD]: '> 999 < 1' // This range is meant to be impossible
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
            [KEYWORD]: '*'
          },
          [KEYNAME]: 'hello' as any
        })
      },

      'found-dependency-in-peer': {
        'qux': virpkg({
          name: 'qux',
          dependencies: {
            [KEYWORD]: '*'
          },
          peerDependencies: {
            [KEYWORD]: '*'
          }
        })
      }
    }
  }, container)
}

export = createFactory
