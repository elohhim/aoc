from functools import reduce
from typing import Iterator, List, Tuple, TypeVar


T = TypeVar("T")


def window_zip(ls: List[T], window_size: int) -> Iterator[Tuple[T, ...]]:
    return zip(*(ls[i:] for i in range(window_size)))


def parse_data(data: str) -> List[int]:
    return [int(d) for d in data.split('\n')]


def solve_1(data: str) -> int:
    depths = parse_data(data)
    return [d2 > d1 for d1, d2 in window_zip(depths, 2)].count(True)


def solve_2(data: str) -> int:
    depths = parse_data(data)
    sums = [sum(w) for w in window_zip(depths, 3)]
    return [s2 > s1 for s1, s2 in window_zip(sums, 2)].count(True)
