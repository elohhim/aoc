import { EventKey } from '../model/event-key';
import { Adapter } from './adapter';

export const AMPLAdapter: Adapter<'AMPL'> = {
  language: 'AMPL',
  multiFile: true,
  getSolutionRepositoryPath({ event, day }: EventKey): string {
    return `ampl/${event}/${String(day).padStart(2, '0')}`;
  },
};
