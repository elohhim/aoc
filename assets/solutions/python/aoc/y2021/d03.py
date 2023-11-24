from collections import Counter
from typing import Callable, Sequence


def parse_data(data: str) -> None:
    pass


def solve_1(data: str) -> int:
    def to_int(chars: Sequence[str]) -> int:
        return int("".join(chars), 2)

    counters = (Counter(col) for col in zip(*data.split()))
    sorted_bits = zip(*((bit for bit, _ in c.most_common()) for c in counters))
    coeffs = [to_int(bits) for bits in sorted_bits]
    return coeffs[0] * coeffs[1]


def filter_by_criterion(
    rows: list[str], criterion: Callable[[int, int], int], bit_position: int = 0
) -> str:
    if len(rows) <= 1:
        return rows[0]
    bit_col = (row[bit_position] for row in rows)
    counter = Counter(bit_col)
    criterion_bit = criterion(counter["0"], counter["1"])
    filtered = [row for row in rows if row[bit_position] == criterion_bit]
    return filter_by_criterion(filtered, criterion, bit_position + 1)


def solve_2(data: str) -> int:
    rows = data.split()

    def o2_criterion(zeroes, ones):
        return "0" if zeroes > ones else "1"

    def co2_criterion(zeroes, ones):
        return "0" if zeroes <= ones else "1"

    o2_rating = int(filter_by_criterion(rows, o2_criterion), 2)
    co2_rating = int(filter_by_criterion(rows, co2_criterion), 2)
    return o2_rating * co2_rating
