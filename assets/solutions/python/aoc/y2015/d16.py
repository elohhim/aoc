import re
from collections import defaultdict
from typing import Callable


LINE_PATTERN = r"^Sue ([0-9]+): (.*)$"
PROPERTY_PATTERN = r"([a-z]+): ([0-9]+)"


Properties = dict[str, int]
Knowledge = dict[int, Properties]


def parse_properties(props_str: str) -> Properties:
    props = defaultdict(lambda: None)
    for n, v in re.findall(PROPERTY_PATTERN, props_str):
        props[n] = int(v)
    return props


def parse_mfcsam(mfcsam_data: str) -> Properties:
    matches = re.findall(PROPERTY_PATTERN, mfcsam_data, re.M)
    return {k: int(v) for k, v in matches}


def parse_knowledge(knowledge_data: str) -> Knowledge:
    lines = re.findall(LINE_PATTERN, knowledge_data, re.M)
    return {i: parse_properties(p) for i, p in lines}


def parse_data(data: str) -> tuple[Properties, Knowledge]:
    mfcsam_data, knowledge_data = data.split("\n###\n")
    return parse_mfcsam(mfcsam_data), parse_knowledge(knowledge_data)


def solve(data: str, override_ops: dict[str, Callable] = {}) -> int:
    mfcsam, knowledge = parse_data(data)
    ops = defaultdict(lambda: int.__eq__, override_ops)

    def sue_matches(props: Properties) -> bool:
        def prop_matches(p: str, v: int) -> bool:
            return props[p] is None or ops[p](props[p], v)

        return all(prop_matches(p, v) for p, v in mfcsam.items())

    for number, props in knowledge.items():
        if sue_matches(props):
            return number
    raise RuntimeError("No solution found.")


def solve_1(data: str) -> int:
    return solve(data)


def solve_2(data: str) -> int:
    return solve(
        data,
        {
            "cats": int.__gt__,
            "trees": int.__gt__,
            "pomeranians": int.__lt__,
            "goldfish": int.__lt__,
        },
    )
