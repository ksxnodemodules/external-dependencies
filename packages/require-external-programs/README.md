# Require External Programs

Prevent user from installing your package without required executables

## Requirements

* Node.js ≥ 8.9.0

## Usage

Add this to your `package.json`:

```json
{
  "devDependencies": {
    "require-external-programs": "<version range>"
  },
  "peerDependencies": {
    "require-external-programs": "<version range>"
  },
  "requireExternalPrograms": [
    "git",
    "python"
  ]
}
```

## Notes

* This package assumes that `process.cwd()` is the root of your project.
* Don't add this package to `"dependencies"` section of `package.json` if you don't want it to run multiple times.

## License

[MIT](https://git.io/fx1N6) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
