import { Adapter } from './adapter';
import { AMPLAdapter } from './ampl-adapter';
import { JavaAdapter } from './java.adapter';
import { PythonAdapter } from './python.adapter';

// To add support for new programming language add it here
export const LANGUAGES = ['AMPL', 'Python', 'Java'] as const;

type Language = typeof LANGUAGES[number];

type Adapters = {
  [key in Language]: Adapter<key>;
};

// TS compiler will ensure that proper adapters are registered here
export const ADAPTERS: Adapters = {
  AMPL: AMPLAdapter,
  Python: PythonAdapter,
  Java: JavaAdapter,
} as const;
