'''
This solution is overcomplicated (and sometimes borderline stupid) on purpose
as I am refreshing several topics after long break from Python.
'''
from typing import Callable, List, Literal, Tuple


MoveCode = Literal['A', 'B', 'C', 'X', 'Y', 'Z']
MoveName = Literal['ROCK', 'PAPER', 'SCISSORS']
OutcomeCode = Literal['X', 'Y', 'Z']


class MoveMeta(type):
    def __new__(cls, name, bases, attrs):
        clz = super().__new__(cls, name, bases, attrs)
        clz.initialize_moves()
        return clz


class Move(metaclass=MoveMeta):
    
    ROCK = None
    PAPER = None
    SCISSORS = None

    def __init__(self, name: MoveName, value: int):
        self.name: MoveName = name
        self.value: int = value

    @classmethod
    def initialize_moves(cls) -> None:
        cls.ROCK = cls('ROCK', 1)
        cls.PAPER = cls('PAPER', 2)
        cls.SCISSORS = cls('SCISSORS', 3)

    @classmethod
    def of(cls, move: MoveCode) -> 'Move':
        match move:
            case 'A' | 'X':
                return cls.ROCK
            case 'B' | 'Y':
                return cls.PAPER
            case 'C' | 'Z':
                return cls.SCISSORS    
            
    def __str__(self) -> str:
        return self.name
            
    def __repr__(self) -> str:
        return f'Move({self.name}, {self.value})'

    def __eq__(self, other: 'Move') -> bool:
        return self is other or self.name == other.name

    def __gt__(self, other: 'Move') -> bool:
        if self is other:
            return False
        match self.name:
            case 'ROCK':
                return other.name == 'SCISSORS'
            case 'PAPER':
                return other.name == 'ROCK'
            case 'SCISSORS':
                return other.name == 'PAPER'
    
    def __add__(self, outcome: OutcomeCode) -> 'Move':
        if outcome == 'Y':
            return self
        match (self, outcome):
            case (self.ROCK, 'Z') | (self.SCISSORS, 'X'):
                return self.PAPER
            case (self.PAPER, 'Z') | (self.ROCK, 'X'):
                return self.SCISSORS
            case (self.SCISSORS, 'Z') | (self.PAPER, 'X'):
                  return self.ROCK


Row = Tuple[str, str]
Rows = List[Row]
Round = Tuple[Move, Move]
Strategy = List[Round]


def calculate_round_score(round: Round) -> int:
    op, my = round
    return my.value + (6 if my > op else 3 if my == op else 0) 


def calculate_strategy_score(strategy: Strategy) -> int:
    return sum(calculate_round_score(round) for round in strategy)


def parse_data(data: str) -> Rows:
    return [tuple(row.split(' ')) for row in data.split('\n')]


def solve(data: str, 
          round_fn: Callable[[Row], Round]) -> int:
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
