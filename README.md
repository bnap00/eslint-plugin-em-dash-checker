# eslint-plugin-em-dash-checker

> "Why does this code read like it was written by a 19th-century novelist?" — Your code reviewer, probably

ESLint plugin to detect em-dash characters (—) and suggest replacements.

## Why?

Let's be honest. You're here for one of two reasons:

### 1. You're using AI coding assistants

AI models *love* em-dashes. They can't help themselves. It's like their typographical comfort food. Every time an AI writes a comment or a string, there's a solid chance it'll sneak in an em-dash like it's penning a Victorian novel.

```javascript
// This function calculates the user's balance — and updates the ledger
//                                             ↑
//                                    "I see you, robot"
```

If you're trying to keep your AI-assisted code on the down-low, em-dashes are a dead giveaway. This plugin helps you maintain plausible deniability. Your secret is safe with us.

### 2. You copy-paste from documentation, Slack, or Word

Em-dashes sneak into your code from word processors, rich text editors, and that one colleague who thinks Slack messages need typographical flair. They can cause subtle bugs, break string comparisons, and make grep sad.

Either way, this plugin has your back.

## Installation

```bash
npm install --save-dev eslint-plugin-em-dash-checker
```

## Usage

### Flat Config (ESLint 9+) - Recommended

```javascript
// eslint.config.mjs
import emDashChecker from 'eslint-plugin-em-dash-checker';

export default [
  // Use the recommended config
  ...emDashChecker.configs.recommended,

  // Or configure manually:
  {
    plugins: {
      'em-dash-checker': emDashChecker,
    },
    rules: {
      'em-dash-checker/no-em-dash': 'warn', // or 'error'
    },
  },
];
```

### Legacy Config (ESLint 8)

```json
{
  "plugins": ["em-dash-checker"],
  "extends": ["plugin:em-dash-checker/legacy-recommended"]
}
```

Or configure manually:

```json
{
  "plugins": ["em-dash-checker"],
  "rules": {
    "em-dash-checker/no-em-dash": "warn"
  }
}
```

## Rules

| Rule | Description |
|------|-------------|
| [no-em-dash](https://github.com/bnap00/eslint-plugin-em-dash-checker/blob/main/docs/rules/no-em-dash.md) | Disallow em-dash characters |

## What Gets Checked

We hunt em-dashes everywhere they hide:

- **String literals** - `"hello—world"`
- **Template literals** - `` `hello—world` ``
- **JSX text** - `<div>hello—world</div>`
- **Line comments** - `// hello—world`
- **Block comments** - `/* hello—world */`

No em-dash escapes. Not one.

## Suggestions

This rule provides suggestions (not auto-fix) so you can choose the appropriate replacement:

- `-` Single hyphen (the classic)
- `--` Double hyphen (for the dramatic pause)
- `---` Triple hyphen (calm down, markdown)
- ` - ` Spaced hyphen (breathe)
- Remove entirely (it was never meant to be)

In VS Code and other editors with ESLint integration, you'll see these options in the quick-fix menu (lightbulb icon). Click, choose, and your code will look like a human wrote it.

## CI Integration

Catch em-dashes before they hit production. Because nothing says "this was AI-generated" like an em-dash in a commit message.

### GitHub Actions

```yaml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx eslint . --max-warnings 0
```

### Pre-commit Hook (with Husky)

```bash
npx husky add .husky/pre-commit "npx eslint . --max-warnings 0"
```

### Pre-commit Hook (with lint-staged)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --max-warnings 0"
  }
}
```

## FAQ

**Q: Is this plugin AI-generated?**
A: We can neither confirm nor deny. But you'll notice there are no em-dashes in this README.

**Q: What about en-dashes?**
A: Those are fine. We're not monsters.

**Q: Will this make my code look more human?**
A: It's one less tell. You're on your own for the rest.

## License

MIT — wait, I mean MIT--no, just MIT.
