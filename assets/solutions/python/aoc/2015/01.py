def solve_1(data: str) -> int:
    return sum(1 if c == '(' else -1 for c in data)


def solve_2(data: str) -> int:
    acc = 0
    for pos, c in enumerate(data):
        acc += 1 if c == '(' else -1
        if acc < 0:
            return pos + 1
