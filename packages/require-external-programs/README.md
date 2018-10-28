# Require External Programs

Prevent user from installing your package without required executables

## Requirements

* Node.js ≥ 8.9.0

## Usage

Add this to your `package.json`:

```json
{
  "dependencies": {
    "require-external-programs": "<version range>"
  },
  "requireExternalPrograms": [
    "git",
    "python"
  ]
}
```

## Notes

* This package assumes you run `npm install` at the root of your project.

## License

[MIT](https://git.io/fx1N6) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
