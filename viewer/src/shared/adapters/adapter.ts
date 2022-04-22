import { EventKey } from '../model/event-key';
import { Language } from '../model/language';

export interface Adapter<T extends Language> {
  get language(): T;
  getSolutionRepositoryPath(eventKey: EventKey): string;
}
