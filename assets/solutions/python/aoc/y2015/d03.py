from typing import Literal, Set, Tuple

Dir = Literal['<', '>', 'v', '^']
Coord = Tuple[int, int]


def travel(start: Coord, direction: Dir) -> Coord:
    if direction == '<':
        x, y = start[0] - 1, start[1]
    if direction == '>':
        x, y = start[0] + 1, start[1]
    if direction == 'v':
        x, y = start[0], start[1] - 1
    if direction == '^':
        x, y = start[0], start[1] + 1
    return x, y


def visited_houses(start: Coord, directions: str) -> Set[Coord]:
    houses = set()
    houses.add(start)
    for direction in directions:
        dest = travel(start, direction)
        houses.add(dest)
        start = dest
    return houses


def solve_1(data: str) -> int:
    return len(visited_houses((0, 0), data))


def solve_2(data: str) -> int:
    santa_houses = visited_houses((0, 0), data[::2])
    robot_houses = visited_houses((0, 0), data[1::2])
    return len(santa_houses | robot_houses)
