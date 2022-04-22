import { EventKey } from '../+model/event-key';
import { Adapter } from './adapter';

export class PythonAdapter implements Adapter<'Python'> {
  get language(): 'Python' {
    return 'Python';
  }

  getSolutionRepositoryPath({ event, day }: EventKey): string {
    return `python/aoc/${event}/${String(day).padStart(2, '0')}.py`;
  }
}
