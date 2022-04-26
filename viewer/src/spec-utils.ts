type AnyFun = (...args: any[]) => any;

type ArgsType<T> = T extends (...args: infer Args) => any ? Args : never;

export function pureAssert<T extends AnyFun>(
  subject: T,
  args: ArgsType<T>,
  expected: ReturnType<T> | jasmine.AsymmetricMatcher<any>
): void {
  const result = subject(...args);
  expect(result).toEqual(expected);
}

export function pureIt<T extends AnyFun>(
  expectation: string,
  subject: () => T,
  args: ArgsType<T>,
  expected: ReturnType<T> | jasmine.AsymmetricMatcher<any>,
  timeout?: number
): void {
  it(expectation, () => pureAssert(subject(), args, expected), timeout);
}

interface UnrollCase<T extends AnyFun> {
  args: ArgsType<T>;
  expected: ReturnType<T>;
}

interface UnrollOptions<T extends AnyFun> {
  timeout?: number;
  matcher?: (expected: ReturnType<T>) => jasmine.AsymmetricMatcher<any>;
}

export function unroll<T extends AnyFun>(
  expectation: string,
  subject: () => T,
  cases: UnrollCase<T>[],
  { timeout, matcher }: UnrollOptions<T> = {}
): void {
  cases.forEach(({ args, expected }, index) =>
    pureIt(
      `${expectation} -- ${index}: ${JSON.stringify(args)}`,
      subject,
      args,
      matcher?.(expected) ?? expected,
      timeout
    )
  );
}
