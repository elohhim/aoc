from typing import Literal
import re


NOT = "NOT"
OR = "OR"
AND = "AND"
LSHIFT = "LSHIFT"
RSHIFT = "RSHIFT"
type Operator = Literal[NOT, OR, AND, LSHIFT, RSHIFT]
type Variable = str
type Argument = int | Variable
type Expression = tuple[Argument, Operator, Argument]
type Expressiondict = dict[Variable, Expression]

# Grammatic
OPERATORS = f"{NOT}|{OR}|{AND}|{LSHIFT}|{RSHIFT}"
LITERAL = r"[a-z]+"
NUMBER = r"[0-9]+"
ARG = rf"{LITERAL}|{NUMBER}"
LSIDE = rf"(?:({ARG}) )?(?:({OPERATORS}) )?({ARG})"
ASSIGNMENT = rf"{LSIDE} -> ({LITERAL})"


def evaluate(
    argument: Argument,
    expressions: Expressiondict,
    evaluations: dict[str, int],
    level=0,
) -> int:
    try:
        return evaluations[argument]
    except KeyError:
        pass
    try:
        value = int(argument)
    except ValueError:
        a1, op, a2 = expressions[argument]
        x1 = None if a1 is None else evaluate(a1, expressions, evaluations, level + 1)
        x2 = None if a2 is None else evaluate(a2, expressions, evaluations, level + 1)
        value = {
            NOT: lambda _, x: ~x,
            OR: lambda x, y: x | y,
            AND: lambda x, y: x & y,
            LSHIFT: lambda x, y: x << y,
            RSHIFT: lambda x, y: x >> y,
            None: lambda _, x: x,
        }[op](x1, x2) % 65536
        evaluations[argument] = value
        # print(f"L{level}: {a1} {op} {a2} -> {argument} = {value}")
    return value


def parse_line(line: str) -> tuple[Variable, Expression]:
    m = re.match(ASSIGNMENT, line)
    return (m[4], (m[1], m[2], m[3]))


def parse_data(data: str) -> tuple[str, Expressiondict]:
    lines = data.split("\n")
    return lines[0], {k: v for k, v in map(parse_line, lines[1:])}


def solve_1(data: str) -> int:
    query, expressions = parse_data(data)
    return evaluate(query, expressions, dict())


def solve_2(data: str) -> int:
    query, expressions = parse_data(data)
    solution_1 = solve_1(data)
    expressions["b"] = (None, None, solution_1)
    return evaluate(query, expressions, dict())
