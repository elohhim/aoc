import { EventKey } from '../model/event-key';
import { Adapter } from './adapter';

export const PythonAdapter: Adapter<'Python'> = {
  language: 'Python',
  multiFile: false,
  getSolutionRepositoryPath({ event, day }: EventKey): string {
    return `python/aoc/y${event}/d${String(day).padStart(2, '0')}.py`;
  },
};
