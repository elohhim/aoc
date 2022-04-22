import { EventKey } from '../model/event-key';
import { JavaAdapter } from './java.adapter';

describe('JavaAdapter', () => {
  const javaAdapter = new JavaAdapter();

  describe('getSolutionRepositoryPath', () => {
    [
      {
        day: 1,
        expected:
          'java/src/main/java/elohhim/aoc/solver/y2010/d01/Y2010D01Solver.java',
      },
      {
        day: 11,
        expected:
          'java/src/main/java/elohhim/aoc/solver/y2010/d11/Y2010D11Solver.java',
      },
    ].forEach(({ day, expected }) =>
      it(`should return ${expected} path to Java solver class containing solution for given event key`, () => {
        const eventKey: EventKey = { event: 2010, day };
        const result = javaAdapter.getSolutionRepositoryPath(eventKey);
        expect(result).toEqual(expected);
      })
    );
  });
});
