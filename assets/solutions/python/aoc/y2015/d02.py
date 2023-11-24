def parse_dimensions(line: str) -> tuple[int, int, int]:
    a, b, c = sorted(int(c) for c in line.split("x"))
    return a, b, c


def parse_data(data: str) -> list[tuple[int, int, int]]:
    lines = [l.strip() for l in data.split("\n")]
    return [parse_dimensions(l) for l in lines]


def get_area(a: int, b: int, c: int) -> int:
    return 3 * a * b + 2 * a * c + 2 * b * c


def get_volume(a: int, b: int, c: int) -> int:
    return a * b * c


def get_perimeter(a: int, b: int, c: int) -> int:
    return 2 * (a + b)


def solve_1(data: str) -> int:
    dimensions = parse_data(data)
    return sum(get_area(*ds) for ds in dimensions)


def solve_2(data: str) -> int:
    dimensions = parse_data(data)
    return sum(get_volume(*ds) + get_perimeter(*ds) for ds in dimensions)
