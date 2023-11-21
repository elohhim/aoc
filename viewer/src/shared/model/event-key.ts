// just because you can does not mean you should ;)
export type Day =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

export function parseDay(value: string): Day {
  let candidate = parseInt(value);
  if (1 <= candidate && candidate <=25) {
    return candidate as Day;
  }
  throw new Error(`Invalid event day value ${value}`)
}

export interface EventKey {
  event: number;
  day: Day;
}
