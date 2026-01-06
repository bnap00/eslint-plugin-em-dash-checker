import type { Rule } from 'eslint';
import type { Node, Comment } from 'estree';
import { EM_DASH_REGEX, REPLACEMENT_OPTIONS } from '../utils/replacement-options.js';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow em-dash characters (\u2014) in code',
      recommended: true,
      url: 'https://github.com/bnap00/eslint-plugin-em-dash-checker/blob/main/docs/rules/no-em-dash.md',
    },
    hasSuggestions: true,
    messages: {
      foundEmDash:
        'Em-dash character (\u2014) found in {{context}}. Consider using a standard hyphen or double-hyphen instead.',
      replaceWith: 'Replace em-dash with "{{replacement}}"',
    },
    schema: [],
  },

  create(context): Rule.RuleListener {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    function reportEmDash(
      node: Node | Comment,
      text: string,
      contextType: string,
      baseOffset: number
    ): void {
      const regex = new RegExp(EM_DASH_REGEX.source, 'g');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const emDashStart = baseOffset + match.index;
        const emDashEnd = emDashStart + 1;

        context.report({
          node: node as Node,
          loc: {
            start: sourceCode.getLocFromIndex(emDashStart),
            end: sourceCode.getLocFromIndex(emDashEnd),
          },
          messageId: 'foundEmDash',
          data: { context: contextType },
          suggest: REPLACEMENT_OPTIONS.map((option) => ({
            messageId: 'replaceWith' as const,
            data: { replacement: option.replacement || '(empty)' },
            fix(fixer: Rule.RuleFixer) {
              return fixer.replaceTextRange([emDashStart, emDashEnd], option.replacement);
            },
          })),
        });
      }
    }

    function checkLiteral(node: Rule.Node): void {
      const literal = node as Node & {
        value: unknown;
        raw?: string;
        range?: [number, number];
      };

      if (typeof literal.value !== 'string') return;
      if (!EM_DASH_REGEX.test(literal.value)) return;

      EM_DASH_REGEX.lastIndex = 0;

      const raw = literal.raw ?? JSON.stringify(literal.value);
      const range = literal.range;
      if (!range) return;

      reportEmDash(node, raw, 'string literal', range[0]);
    }

    function checkTemplateLiteral(node: Rule.Node): void {
      const template = node as Node & {
        quasis: Array<{
          value: { raw: string };
          range?: [number, number];
        }>;
      };

      for (const quasi of template.quasis) {
        const text = quasi.value.raw;
        if (!EM_DASH_REGEX.test(text)) continue;

        EM_DASH_REGEX.lastIndex = 0;

        const range = quasi.range;
        if (!range) continue;

        // +1 to skip the opening backtick or }
        reportEmDash(node, text, 'template literal', range[0] + 1);
      }
    }

    function checkJSXText(node: Rule.Node): void {
      const jsxText = node as Node & {
        value: string;
        range?: [number, number];
      };

      if (!EM_DASH_REGEX.test(jsxText.value)) return;

      EM_DASH_REGEX.lastIndex = 0;

      const range = jsxText.range;
      if (!range) return;

      reportEmDash(node, jsxText.value, 'JSX text', range[0]);
    }

    function checkComments(): void {
      const comments = sourceCode.getAllComments();

      for (const comment of comments) {
        if (!EM_DASH_REGEX.test(comment.value)) continue;

        EM_DASH_REGEX.lastIndex = 0;

        const range = comment.range;
        if (!range) continue;

        // Both // and /* are 2 characters
        const prefixLength = 2;

        reportEmDash(
          comment,
          comment.value,
          `${comment.type.toLowerCase()} comment`,
          range[0] + prefixLength
        );
      }
    }

    return {
      Literal: checkLiteral,
      TemplateLiteral: checkTemplateLiteral,
      JSXText: checkJSXText,
      'Program:exit': checkComments,
    };
  },
};

export default rule;
