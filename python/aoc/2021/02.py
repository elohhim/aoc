import re
from typing import Callable, List, Literal, Tuple
from functools import reduce

FORWARD = 'forward'
UP = 'up'
DOWN = 'down'
DIRECTIONS = [FORWARD, UP, DOWN]
COMMAND_PATTERN = re.compile(rf'({"|".join(DIRECTIONS)}) ([0-9])')


Direction = Literal[FORWARD, UP, DOWN]
Command = Tuple[Direction, int]
Coord = Tuple[int, ...]


def parse_data(data: str) -> List[Command]:
    matches = COMMAND_PATTERN.findall(data)

    def match2instruction(m: Tuple[str, ...]) -> Command:
        return (m[0], int(m[1]))

    return [match2instruction(m) for m in matches]


def solve(data: str,
          command_reducer: Callable[[Coord, Command], Coord],
          initial: Coord) -> int:
    commands = parse_data(data)
    final_position = reduce(command_reducer, commands, initial)
    return final_position[0] * final_position[1]


def solve_1(data: str) -> int:

    def command_reducer(coord: Coord, command: Command) -> Coord:
        horizontal, depth = coord
        dir, value = command
        if dir == FORWARD:
            return (horizontal + value, depth)
        if dir == UP:
            return (horizontal, depth - value)
        if dir == DOWN:
            return (horizontal, depth + value)

    return solve(data, command_reducer, (0, 0))


def solve_2(data: str) -> int:

    def command_reducer(coord: Coord, command: Command) -> Coord:
        horizontal, depth, aim = coord
        dir, value = command
        if dir == FORWARD:
            return (horizontal + value, depth + aim * value, aim)
        if dir == UP:
            return (horizontal, depth, aim - value)
        if dir == DOWN:
            return (horizontal, depth, aim + value)

    return solve(data, command_reducer, (0, 0, 0))
