import { EventKey } from '../model/event-key';
import { Adapter } from './adapter';

export class JavaAdapter implements Adapter<'Java'> {
  get language(): 'Java' {
    return 'Java';
  }

  getSolutionRepositoryPath({ event, day }: EventKey): string {
    const paddedDay = String(day).padStart(2, '0');
    // too javy even for me :grin:
    return `java/src/main/java/elohhim/aoc/solver/y${event}/d${paddedDay}/Y${event}D${paddedDay}Solver.java`;
  }
}
