import { Day, EventKey } from '../model/event-key';
import { PythonAdapter } from './python.adapter';

describe('PythonAdapter', () => {
  describe('getSolutionRepositoryPath', () => {
    [
      { day: 1 as Day, expected: 'python/aoc/y2010/d01.py' },
      { day: 11 as Day, expected: 'python/aoc/y2010/d11.py' },
    ].forEach(({ day, expected }) =>
      it(`should return ${expected} path to Python module containing solution for given event key`, () => {
        const eventKey: EventKey = { event: 2010, day };
        const result = PythonAdapter.getSolutionRepositoryPath(eventKey);
        expect(result).toEqual(expected);
      })
    );
  });
});
