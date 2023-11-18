from functools import wraps
from typing import Any, Callable, List, Tuple
from time import time


def dir_path(year: int, day: int) -> str:
    return f'../input/{year}/{day:02d}'


def read_input(year: int, day: int) -> str:
    with open(f'{dir_path(year, day)}/input.txt', 'r') as file:
        return file.read()


def read_tc(year: int, day: int, part: int) -> List[Tuple[str, str]]:
    try:
        with open(f'{dir_path(year, day)}/tc{part}.txt', 'r') as file:
            lines = [l.strip().replace('\\n', '\n') for l in file.readlines()]
        return list(zip(lines[::2], lines[1::2]))
    except FileNotFoundError:
        return None


def test(fun: Callable[[str], Any],
         test_cases: List[Tuple[str, str]]) -> None:
    for data, expected in test_cases:
        result = fun(data)
        try:
            assert expected == str(result)
        except AssertionError:
            print(f'''For:
{data}
expected: {expected}
got: {result}''')
            exit(1)


Timed = Tuple[int, Any]


def timed(fun):

    @wraps(fun)
    def wrapper(*args, **kwargs) -> Timed:
        start = time()
        result = fun(*args, **kwargs)
        duration = int(1000 * (time() - start))
        return duration, result

    return wrapper
