import { ADAPTERS } from '../adapters/adapter-registry';

export type Language = keyof typeof ADAPTERS;
