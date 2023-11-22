from typing import cast, List, NamedTuple, Tuple


class Range(NamedTuple):
    start: int
    end: int


RangePair = Tuple[Range, Range]


def parse_range(range: str) -> Range:
    return Range(*(int(r) for r in range.split("-")))


def parse_row(row: str) -> RangePair:
    ranges = row.split(",")
    if len(ranges) == 2:
        return (parse_range(ranges[0]), parse_range(ranges[1]))
    raise ValueError(f'Malformed RangePair data: {row}')


def parse_data(data: str) -> List[RangePair]:
    return [parse_row(row) for row in data.split("\n")]


def contains(range1: Range, range2: Range) -> bool:
    return range1.start <= range2.start and range1.end >= range2.end


def overlap(range1: Range, range2: Range) -> bool:
    return range1.start <= range2.end and range1.end >= range2.start


def full_pair_overlap(pair: RangePair) -> bool:
    return contains(*pair) or contains(*pair[::-1])


def solve_1(data: str) -> int:
    pairs = parse_data(data)
    return len([pair for pair in pairs if full_pair_overlap(pair)])


def solve_2(data: str) -> int:
    pairs = parse_data(data)
    return len([pair for pair in pairs if overlap(*pair)])
