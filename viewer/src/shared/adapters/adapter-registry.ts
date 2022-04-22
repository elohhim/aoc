import { Adapter } from './adapter';
import { JavaAdapter } from './java.adapter';
import { PythonAdapter } from './python.adapter';

// To add support for new programming language add it here
const LANGUAGES = ['Python', 'Java'] as const;

type Language = typeof LANGUAGES[number];

type Adapters = {
  [key in Language]: Adapter<key>;
};

// TS compiler will ensure that proper adapters are present
export const ADAPTERS: Adapters = {
  Python: new PythonAdapter(),
  Java: new JavaAdapter(),
} as const;
