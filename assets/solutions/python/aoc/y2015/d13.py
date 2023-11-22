import re
from collections import defaultdict, deque
from itertools import permutations
from typing import Callable, Dict, Iterable, Tuple


HappinessMap = Dict[str, Dict[str, int]]


PATTERN = (r"^([A-Z][a-z]*) would (gain|lose) ([0-9]+) happiness units by"
           r" sitting next to ([A-Z][a-z]*).$")


def parse_data(data: str, initializer: Callable = dict) -> HappinessMap:
    coeffs = {
        'gain': 1,
        'lose': -1
    }
    matches = re.findall(PATTERN, data, re.MULTILINE)
    hapiness_map = defaultdict(initializer)
    for m in matches:
        who = m[0]
        next_to = m[3]
        value = coeffs[m[1]] * int(m[2])
        hapiness_map[who][next_to] = value
    return hapiness_map


def happiness(hapiness_map: HappinessMap,
              permutation: Iterable[str]) -> int:
    l_neighbours = deque(permutation)
    l_neighbours.rotate(1)
    r_neighbours = deque(permutation)
    r_neighbours.rotate(-1)
    triples = zip(l_neighbours, permutation, r_neighbours)

    def person_happiness(t: Tuple[str, str, str]) -> int:
        l, p, r = t
        return hapiness_map[p][l] + hapiness_map[p][r]

    return sum(person_happiness(t) for t in triples)


def solve(happiness_map: HappinessMap) -> int:
    people = happiness_map.keys()
    return max(happiness(happiness_map, p) for p in permutations(people))


def solve_1(data: str) -> int:
    return solve(parse_data(data))


def solve_2(data: str) -> int:
    happiness_map = parse_data(data, initializer=lambda: {'Me': 0})
    happiness_map['Me'] = defaultdict(lambda: 0)
    return solve(happiness_map)
