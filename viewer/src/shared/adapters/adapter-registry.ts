import { Adapter } from './adapter';
import { JavaAdapter } from './java.adapter';
import { PythonAdapter } from './python.adapter';

// To add support for new programming language add it here
const LANGUAGES = ['Python', 'Java'] as const;

type Language = typeof LANGUAGES[number];

type Adapters = {
  [key in Language]: Adapter<key>;
};

// TS compiler will ensure that proper adapters are registered here
export const ADAPTERS: Adapters = {
  Python: PythonAdapter,
  Java: JavaAdapter,
} as const;
