from typing import Iterator
from hashlib import md5


def get_candidate(data: str) -> Iterator[str]:
    i = 0
    while True:
        i += 1
        yield i, f"{data}{i}"


def find_hash_idx_starting_with(data: str, prefix: str) -> int:
    for idx, candidate in get_candidate(data):
        hash = md5(candidate.encode()).hexdigest()
        if hash[:len(prefix)] == prefix:
            return idx


def solve_1(data: str) -> None:
    return find_hash_idx_starting_with(data, '00000')


def solve_2(data: str) -> None:
    return find_hash_idx_starting_with(data, '000000')
