import json
import re
from typing import Any


PATTERN = r"-?[1-9][0-9]*"


def walk(json_data, filter):
    if isinstance(json_data, list):
        return sum(walk(e, filter) for e in json_data)
    if isinstance(json_data, dict):
        if filter(json_data):
            return 0
        else:
            return sum(walk(e, filter) for e in json_data.values())
    try:
        return int(json_data)
    except ValueError:
        return 0


def parse_data(data: str) -> None:
    return json.loads(data)


def solve_1(data: str) -> int:
    return sum(int(n) for n in re.findall(PATTERN, data))
    # return walk(parse_data(data), lambda _: False)


def solve_2(data: str) -> int:
    def red_filter(d: dict[str, Any]) -> bool:
        return "red" in d.values()

    return walk(parse_data(data), red_filter)
