import { EventKey } from '../model/event-key';
import { Language } from '../model/language';

export interface Adapter<T extends Language> {
  language: T;
  multiFile: boolean;
  getSolutionRepositoryPath(eventKey: EventKey): string;
}
