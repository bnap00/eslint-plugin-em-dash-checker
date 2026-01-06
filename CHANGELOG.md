# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-06

### Added

- Initial release of `eslint-plugin-em-dash-checker`
- `no-em-dash` rule that detects em-dash characters (U+2014) in:
  - String literals
  - Template literals
  - JSX text content
  - Line comments
  - Block comments
- 5 replacement suggestions:
  - Single hyphen (`-`)
  - Double hyphen (`--`)
  - Triple hyphen (`---`)
  - Spaced hyphen (` - `)
  - Remove entirely
- Support for ESLint 8 (legacy eslintrc) and ESLint 9+ (flat config)
- Dual CJS/ESM package distribution
- TypeScript type definitions included
