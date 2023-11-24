"""
This solution is overcomplicated (and sometimes borderline stupid) on purpose
as I am refreshing several topics after long break from Python.
"""
from typing import cast, get_args, Callable, ClassVar, Literal


type MoveCode1 = Literal["A", "B", "C"]
type MoveCode2 = Literal["X", "Y", "Z"]
type MoveCode = MoveCode1 | MoveCode2
type MoveName = Literal["ROCK", "PAPER", "SCISSORS"]


class MoveMeta(type):
    def __new__(cls, name, bases, attrs):
        clz = super().__new__(cls, name, bases, attrs)
        clz.initialize_moves()

        # just because you can doesn't mean you should
        def __init__(self, *args, **kwargs):
            raise RuntimeError("The Move class is not instantiable.")

        clz.__init__ = __init__
        return clz


class Move(metaclass=MoveMeta):
    ROCK: ClassVar["Move"]
    PAPER: ClassVar["Move"]
    SCISSORS: ClassVar["Move"]

    def __init__(self, name: MoveName, value: int):
        self.name: MoveName = name
        self.value: int = value

    @classmethod
    def initialize_moves(cls) -> None:
        cls.ROCK = cls("ROCK", 1)
        cls.PAPER = cls("PAPER", 2)
        cls.SCISSORS = cls("SCISSORS", 3)

    @classmethod
    def of(cls, move: MoveCode) -> "Move":
        match move:
            case "A" | "X":
                return cls.ROCK
            case "B" | "Y":
                return cls.PAPER
            case "C" | "Z":
                return cls.SCISSORS

    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        return f"Move({self.name}, {self.value})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Move):
            return False
        return self is other or self.name == other.name

    def __gt__(self, other: "Move") -> bool:
        if self is other:
            return False
        match self.name:
            case "ROCK":
                return other.name == "SCISSORS"
            case "PAPER":
                return other.name == "ROCK"
            case "SCISSORS":
                return other.name == "PAPER"

    def __add__(self, outcome: MoveCode2) -> "Move":
        if outcome == "Y":
            return self
        match (self, outcome):
            case (self.ROCK, "Z") | (self.SCISSORS, "X"):
                return self.PAPER
            case (self.PAPER, "Z") | (self.ROCK, "X"):
                return self.SCISSORS
            case (self.SCISSORS, "Z") | (self.PAPER, "X"):
                return self.ROCK
        raise RuntimeError(f"Can't add {outcome} to {self}")


Row = tuple[MoveCode1, MoveCode2]
Rows = list[Row]
Round = tuple[Move, Move]
Strategy = list[Round]


def calculate_round_score(round: Round) -> int:
    op, my = round
    return my.value + (6 if my > op else 3 if my == op else 0)


def calculate_strategy_score(strategy: Strategy) -> int:
    return sum(calculate_round_score(round) for round in strategy)


def parse_move1(data: str) -> MoveCode1:
    if data in get_args(MoveCode1):
        return cast(MoveCode1, data)
    raise ValueError(f'Malformed MoveCode1 data: "{data}".')


def parse_move2(data: str) -> MoveCode2:
    if data in get_args(MoveCode2):
        return cast(MoveCode2, data)
    raise ValueError(f'Malformed MoveCode2 data: "{data}".')


def parse_row(data: str) -> Row:
    values = data.split(" ")
    if len(values) == 2:
        return (parse_move1(values[0]), parse_move2(values[1]))
    raise ValueError(f'Malformed Row data "{data}"')


def parse_data(data: str) -> Rows:
    return [parse_row(row) for row in data.split("\n")]


def solve(data: str, round_fn: Callable[[Row], Round]) -> int:
    rows = parse_data(data)
    strategy = [round_fn(row) for row in rows]
    return calculate_strategy_score(strategy)


def solve_1(data: str) -> int:
    def round(row: Row) -> Round:
        op, me = row
        return (Move.of(op), Move.of(me))

    return solve(data, round)


def solve_2(data: str) -> int:
    def round(row: Row) -> Round:
        op, outcome = row
        op_move = Move.of(op)
        return (op_move, op_move + outcome)

    return solve(data, round)
