import { eventKeys } from './generate-aoc-metadata';

describe('eventKeys', () => {
  test('should generate event keys for 2015 and 2016', () => {
    const result = [...eventKeys({ first: 2015, last: 2016 })];

    expect(result.length).toBe(40);
    expect(result[0]).toEqual({ event: 2015, day: 1 });
    expect(result[39]).toEqual({ event: 2016, day: 20 });
  });
});
