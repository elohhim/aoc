import { EventKey } from './event-key';
import { Language } from './language';

export interface SolutionKey extends EventKey {
  language: Language;
}
