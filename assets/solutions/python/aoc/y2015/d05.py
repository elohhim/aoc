from typing import Callable, Literal
import re


type NaughtyNice = Literal["naughty", "nice"]
type Rule = Callable[[str], bool]


VOWELS = re.compile(r"[aeiou]")
DOUBLETS = re.compile(r"(.)\1+")
FORBIDDEN = re.compile(r"ab|cd|pq|xy")
TWIN_PAIRS = re.compile(r"(..).*\1+")
ALMOST_DOUBLETS = re.compile(r"(.).\1+")


def categorize(line: str, rules: list[Rule]) -> NaughtyNice:
    return "nice" if all(r(line) for r in rules) else "naughty"


def parse_data(data: str) -> list[str]:
    return (l.strip() for l in data.split("\n"))


def solve(data: str, rules: list[Rule]) -> int:
    lines = parse_data(data)
    categorized = [categorize(l, rules) for l in lines]
    return len([c for c in categorized if c == "nice"])


def solve_1(data: str) -> int:
    rules = [
        lambda l: len(VOWELS.findall(l)) >= 3,
        lambda l: DOUBLETS.search(l) is not None,
        lambda l: FORBIDDEN.search(l) is None,
    ]
    return solve(data, rules)


def solve_2(data: str) -> int:
    rules = [
        lambda l: TWIN_PAIRS.search(l) is not None,
        lambda l: ALMOST_DOUBLETS.search(l) is not None,
    ]
    return solve(data, rules)
