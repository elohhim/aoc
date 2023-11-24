from array import array, ArrayType
from typing import Callable, Literal
import re
from functools import reduce
import itertools


TURN_ON = "turn on"
TURN_OFF = "turn off"
TOGGLE = "toggle"
ACTIONS = [TURN_ON, TURN_OFF, TOGGLE]
PATTERN = re.compile(rf'({"|".join(ACTIONS)}) (\d+),(\d+) through (\d+),(\d+)')
SIZE = 1000

type Action = Literal[TURN_ON, TURN_OFF, TOGGLE]
type Coordinates = tuple[int, int]
type Instruction = tuple[Action, Coordinates, Coordinates]
type Board = ArrayType
type Operator = Callable[[int], int]
type Operators = dict[Action, Operator]

flatten = itertools.chain.from_iterable


def parse_instructions(data: str) -> list[Instruction]:
    matches = PATTERN.findall(data)

    def match2instruction(m: tuple[str, ...]) -> Instruction:
        return (m[0], (int(m[1]), int(m[2])), (int(m[3]), int(m[4])))

    return [match2instruction(m) for m in matches]


def do(board: Board, instruction: Instruction, operators: Operators) -> Board:
    action, c1, c2 = instruction
    operator = operators[action]

    def is_rect(c: Coordinates) -> bool:
        x, y = c
        x1, y1 = c1
        x2, y2 = c2
        return x1 <= x <= x2 and y1 <= y <= y2

    result = array("i")
    for y in range(SIZE):
        for x in range(SIZE):
            b = board[y * SIZE + x]
            value = operator(b) if is_rect((x, y)) else b
            result.append(value)
    return result


def solve(data: str, operators: Operators) -> int:
    instructions = parse_instructions(data)
    initial_board = array("i", [0 for _ in range(SIZE * SIZE)])
    result = reduce(
        lambda board, ins: do(board, ins, operators), instructions, initial_board
    )
    return sum(result)


def solve_1(data: str) -> int:
    operators = {
        TURN_ON: lambda b: 1,
        TURN_OFF: lambda b: 0,
        TOGGLE: lambda b: 0 if b == 1 else 1,
    }
    return solve(data, operators)


def solve_2(data: str) -> int:
    operators = {
        TURN_ON: lambda b: b + 1,
        TURN_OFF: lambda b: 0 if b == 0 else b - 1,
        TOGGLE: lambda b: b + 2,
    }
    return solve(data, operators)
