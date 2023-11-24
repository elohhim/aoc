from typing import Iterator


def window_zip[T](ls: list[T], window_size: int) -> Iterator[tuple[T, ...]]:
    return zip(*(ls[i:] for i in range(window_size)))


def parse_data(data: str) -> list[int]:
    return [int(d) for d in data.split("\n")]


def solve_1(data: str) -> int:
    depths = parse_data(data)
    return [d2 > d1 for d1, d2 in window_zip(depths, 2)].count(True)


def solve_2(data: str) -> int:
    depths = parse_data(data)
    sums = [sum(w) for w in window_zip(depths, 3)]
    return [s2 > s1 for s1, s2 in window_zip(sums, 2)].count(True)
