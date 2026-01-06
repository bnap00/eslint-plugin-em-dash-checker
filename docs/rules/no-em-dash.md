# em-dash-checker/no-em-dash

> "That's not a hyphen. That's an em-dash pretending to be a hyphen."

Disallow em-dash characters (—) in code.

## Rule Details

This rule detects the em-dash character (Unicode U+2014, —) in:

- String literals
- Template literals
- JSX text content
- Line comments
- Block comments

Em-dashes commonly appear when:
- AI coding assistants generate code (they love fancy typography)
- Copy-pasting from word processors, Slack, or documentation
- Your keyboard has a mind of its own

### Incorrect

```js
// This calculates the total — including tax
const message = "Hello—World";
const template = `Welcome—Friend`;
```

```jsx
<div>Hello—World</div>
<button title="Click—Me">Submit</button>
```

### Correct

```js
// This calculates the total - including tax
const message = "Hello-World";
const template = `Welcome-Friend`;
```

```jsx
<div>Hello-World</div>
<button title="Click-Me">Submit</button>
```

## Suggestions

This rule provides suggestions rather than auto-fix, because the right replacement depends on context:

| Suggestion | Result | Use case |
|------------|--------|----------|
| Single hyphen | `-` | Most common replacement |
| Double hyphen | `--` | Mimics em-dash in plain text |
| Triple hyphen | `---` | Markdown horizontal rule style |
| Spaced hyphen | ` - ` | When you want breathing room |
| Remove | `` | When it shouldn't be there at all |

In VS Code, hover over the warning and click the lightbulb icon to see all options.

## Options

This rule has no options. It flags all em-dashes unconditionally.

## When Not To Use It

If your codebase intentionally uses em-dashes for specific typographic purposes (rare in code, but you do you), you can disable this rule:

```js
/* eslint-disable em-dash-checker/no-em-dash */
const fancy = "Very—Fancy—Indeed";
/* eslint-enable em-dash-checker/no-em-dash */
```

Or for a single line:

```js
const fancy = "Very—Fancy—Indeed"; // eslint-disable-line em-dash-checker/no-em-dash
```

## Fun Fact

The em-dash is called that because it's traditionally the width of the letter "M" in typesetting. The en-dash (–) is the width of an "N". Neither belongs in your code, but we're only hunting the em-dash today.

## Related

- [Wikipedia: Em dash](https://en.wikipedia.org/wiki/Dash#Em_dash)
- The reason you're using this plugin (you know who you are)
