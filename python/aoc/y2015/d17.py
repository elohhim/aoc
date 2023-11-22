import random
from typing import List, Tuple


def parse_data(data: str) -> List[int]:
    return [int(l) for l in data.split('\n')]


def sum_volume(containers: List[Tuple[int, int]]) -> int:
    return sum(c[1] for c in containers)


def get_fitting_combinations(data: str) -> int:
    """Once again just for fun: randomized solution.
    """
    volume, *containers = parse_data(data)

    def _try() -> List[int]:
        available = list(enumerate(containers))
        selected = []
        while sum_volume(selected) < volume:
            i = random.randrange(len(available))
            selected.append(available[i])
            del available[i]
            if sum_volume(selected) == volume:
                return tuple(sorted(selected))

    cache = {r for _ in range(1_000_000) if (r := _try()) is not None}
    return cache


def solve_1(data: str) -> int:
    return len(get_fitting_combinations(data))


def solve_2(data: str) -> int:
    combinations = get_fitting_combinations(data)
    min_len = min(len(c) for c in combinations)
    return len([c for c in combinations if len(c) == min_len])
