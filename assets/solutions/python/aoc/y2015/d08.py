import ast


def parse_data(data: str) -> list[str]:
    return [l.strip() for l in data.split("\n")]


def sum_len(ls: list[str]) -> int:
    return sum(map(len, ls))


def solve_1(data: str) -> int:
    lines = parse_data(data)
    eval_lines = [ast.literal_eval(l) for l in lines]
    return sum_len(lines) - sum_len(eval_lines)


def solve_2(data: str) -> int:
    lines = parse_data(data)

    def escape(l: str) -> str:
        r = l.replace("\\", "\\\\").replace('"', '\\"')
        return f'"{r}"'

    escaped_lines = [escape(l) for l in lines]

    return sum_len(escaped_lines) - sum_len(lines)
