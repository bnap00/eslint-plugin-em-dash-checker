import { RuleTester } from '../setup.js';
import rule from '../../src/rules/no-em-dash.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

ruleTester.run('no-em-dash', rule, {
  valid: [
    // Regular strings without em-dashes
    'const x = "hello-world";',
    'const x = "hello--world";',
    'const x = `template string`;',
    '// regular comment with hyphen',
    '/* block comment with - hyphen */',

    // Numbers are not checked
    'const x = 123;',

    // Empty strings
    'const x = "";',
    'const x = ``;',

    // En-dash (different character U+2013) should NOT be flagged
    'const x = "en-dash: \u2013";',
  ],

  invalid: [
    // String literal with em-dash - full verification with all suggestions
    {
      code: 'const x = "hello\u2014world";',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'string literal' },
          suggestions: [
            {
              messageId: 'replaceWith',
              data: { replacement: '-' },
              output: 'const x = "hello-world";',
            },
            {
              messageId: 'replaceWith',
              data: { replacement: '--' },
              output: 'const x = "hello--world";',
            },
            {
              messageId: 'replaceWith',
              data: { replacement: '---' },
              output: 'const x = "hello---world";',
            },
            {
              messageId: 'replaceWith',
              data: { replacement: ' - ' },
              output: 'const x = "hello - world";',
            },
            {
              messageId: 'replaceWith',
              data: { replacement: '(empty)' },
              output: 'const x = "helloworld";',
            },
          ],
        },
      ],
    },

    // Template literal with em-dash
    {
      code: 'const x = `hello\u2014world`;',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'template literal' },
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = `hello-world`;' },
            { messageId: 'replaceWith', output: 'const x = `hello--world`;' },
            { messageId: 'replaceWith', output: 'const x = `hello---world`;' },
            { messageId: 'replaceWith', output: 'const x = `hello - world`;' },
            { messageId: 'replaceWith', output: 'const x = `helloworld`;' },
          ],
        },
      ],
    },

    // Template literal with multiple em-dashes
    {
      code: 'const x = `before\u2014middle\u2014after`;',
      errors: [
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = `before-middle\u2014after`;' },
            { messageId: 'replaceWith', output: 'const x = `before--middle\u2014after`;' },
            { messageId: 'replaceWith', output: 'const x = `before---middle\u2014after`;' },
            { messageId: 'replaceWith', output: 'const x = `before - middle\u2014after`;' },
            { messageId: 'replaceWith', output: 'const x = `beforemiddle\u2014after`;' },
          ],
        },
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = `before\u2014middle-after`;' },
            { messageId: 'replaceWith', output: 'const x = `before\u2014middle--after`;' },
            { messageId: 'replaceWith', output: 'const x = `before\u2014middle---after`;' },
            { messageId: 'replaceWith', output: 'const x = `before\u2014middle - after`;' },
            { messageId: 'replaceWith', output: 'const x = `before\u2014middleafter`;' },
          ],
        },
      ],
    },

    // JSX text with em-dash
    {
      code: '<div>hello\u2014world</div>',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'JSX text' },
          suggestions: [
            { messageId: 'replaceWith', output: '<div>hello-world</div>' },
            { messageId: 'replaceWith', output: '<div>hello--world</div>' },
            { messageId: 'replaceWith', output: '<div>hello---world</div>' },
            { messageId: 'replaceWith', output: '<div>hello - world</div>' },
            { messageId: 'replaceWith', output: '<div>helloworld</div>' },
          ],
        },
      ],
    },

    // Line comment with em-dash
    {
      code: '// This is an em\u2014dash in a comment',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'line comment' },
          suggestions: [
            { messageId: 'replaceWith', output: '// This is an em-dash in a comment' },
            { messageId: 'replaceWith', output: '// This is an em--dash in a comment' },
            { messageId: 'replaceWith', output: '// This is an em---dash in a comment' },
            { messageId: 'replaceWith', output: '// This is an em - dash in a comment' },
            { messageId: 'replaceWith', output: '// This is an emdash in a comment' },
          ],
        },
      ],
    },

    // Block comment with em-dash
    {
      code: '/* Block with em\u2014dash */',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'block comment' },
          suggestions: [
            { messageId: 'replaceWith', output: '/* Block with em-dash */' },
            { messageId: 'replaceWith', output: '/* Block with em--dash */' },
            { messageId: 'replaceWith', output: '/* Block with em---dash */' },
            { messageId: 'replaceWith', output: '/* Block with em - dash */' },
            { messageId: 'replaceWith', output: '/* Block with emdash */' },
          ],
        },
      ],
    },

    // Multiple em-dashes in same string
    {
      code: 'const x = "first\u2014second\u2014third";',
      errors: [
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = "first-second\u2014third";' },
            { messageId: 'replaceWith', output: 'const x = "first--second\u2014third";' },
            { messageId: 'replaceWith', output: 'const x = "first---second\u2014third";' },
            { messageId: 'replaceWith', output: 'const x = "first - second\u2014third";' },
            { messageId: 'replaceWith', output: 'const x = "firstsecond\u2014third";' },
          ],
        },
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = "first\u2014second-third";' },
            { messageId: 'replaceWith', output: 'const x = "first\u2014second--third";' },
            { messageId: 'replaceWith', output: 'const x = "first\u2014second---third";' },
            { messageId: 'replaceWith', output: 'const x = "first\u2014second - third";' },
            { messageId: 'replaceWith', output: 'const x = "first\u2014secondthird";' },
          ],
        },
      ],
    },

    // JSX attribute value with em-dash
    {
      code: '<div title="hello\u2014world" />',
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'string literal' },
          suggestions: [
            { messageId: 'replaceWith', output: '<div title="hello-world" />' },
            { messageId: 'replaceWith', output: '<div title="hello--world" />' },
            { messageId: 'replaceWith', output: '<div title="hello---world" />' },
            { messageId: 'replaceWith', output: '<div title="hello - world" />' },
            { messageId: 'replaceWith', output: '<div title="helloworld" />' },
          ],
        },
      ],
    },

    // Single quotes
    {
      code: "const x = 'hello\u2014world';",
      errors: [
        {
          messageId: 'foundEmDash',
          data: { context: 'string literal' },
          suggestions: [
            { messageId: 'replaceWith', output: "const x = 'hello-world';" },
            { messageId: 'replaceWith', output: "const x = 'hello--world';" },
            { messageId: 'replaceWith', output: "const x = 'hello---world';" },
            { messageId: 'replaceWith', output: "const x = 'hello - world';" },
            { messageId: 'replaceWith', output: "const x = 'helloworld';" },
          ],
        },
      ],
    },

    // Em-dash at the start of string
    {
      code: 'const x = "\u2014start";',
      errors: [
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = "-start";' },
            { messageId: 'replaceWith', output: 'const x = "--start";' },
            { messageId: 'replaceWith', output: 'const x = "---start";' },
            { messageId: 'replaceWith', output: 'const x = " - start";' },
            { messageId: 'replaceWith', output: 'const x = "start";' },
          ],
        },
      ],
    },

    // Em-dash at the end of string
    {
      code: 'const x = "end\u2014";',
      errors: [
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = "end-";' },
            { messageId: 'replaceWith', output: 'const x = "end--";' },
            { messageId: 'replaceWith', output: 'const x = "end---";' },
            { messageId: 'replaceWith', output: 'const x = "end - ";' },
            { messageId: 'replaceWith', output: 'const x = "end";' },
          ],
        },
      ],
    },

    // Em-dash only
    {
      code: 'const x = "\u2014";',
      errors: [
        {
          messageId: 'foundEmDash',
          suggestions: [
            { messageId: 'replaceWith', output: 'const x = "-";' },
            { messageId: 'replaceWith', output: 'const x = "--";' },
            { messageId: 'replaceWith', output: 'const x = "---";' },
            { messageId: 'replaceWith', output: 'const x = " - ";' },
            { messageId: 'replaceWith', output: 'const x = "";' },
          ],
        },
      ],
    },
  ],
});
