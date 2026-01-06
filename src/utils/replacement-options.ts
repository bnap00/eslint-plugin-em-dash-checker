export const EM_DASH = '\u2014';
export const EM_DASH_REGEX = /\u2014/g;

export interface ReplacementOption {
  description: string;
  replacement: string;
}

export const REPLACEMENT_OPTIONS: ReplacementOption[] = [
  { description: 'Replace with hyphen (-)', replacement: '-' },
  { description: 'Replace with double hyphen (--)', replacement: '--' },
  { description: 'Replace with triple hyphen (---)', replacement: '---' },
  { description: 'Replace with spaced hyphen ( - )', replacement: ' - ' },
  { description: 'Remove em-dash entirely', replacement: '' },
];
