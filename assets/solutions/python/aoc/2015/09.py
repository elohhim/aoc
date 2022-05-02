from collections import defaultdict
from typing import Callable, Dict, Tuple
import random
import re

PATTERN = r"(.*) to (.*) = ([0-9]+)"


def parse_line(line: str) -> Tuple[str, str, int]:
    match = re.match(PATTERN, line)
    return match[1], match[2], int(match[3])


def parse_data(data: str) -> Dict[str, Dict[str, int]]:
    lines = map(str.strip, data.split('\n'))
    edges = map(parse_line, lines)
    distances = defaultdict(dict)
    for x, y, distance in edges:
        distances[x][y] = distance
        distances[y][x] = distance
    return distances


def solve(data: str, fun: Callable) -> int:
    """This is just for fun: MONTE CARLO!
    """
    distances = parse_data(data)

    def walk() -> int:
        to_visit = list(distances.keys())
        current = random.choice(to_visit)
        to_visit.remove(current)
        distance = 0
        while to_visit:
            target = random.choice(to_visit)
            distance += distances[current][target]
            current = target
            to_visit.remove(current)
        return distance

    return fun(walk() for _ in range(100_000))


def solve_1(data: str) -> int:
    return solve(data, min)


def solve_2(data: str) -> int:
    return solve(data, max)
