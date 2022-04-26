import { ADAPTERS } from '../adapters/adapter-registry';

export type Language = keyof typeof ADAPTERS;

export function isLanguage(s: string): s is Language {
  return s in ADAPTERS;
}
