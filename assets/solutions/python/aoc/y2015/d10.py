from itertools import zip_longest


def look_and_say(subject: str) -> str:
    out = ""
    counter = 0
    for current, next in zip_longest(subject, subject[1:]):
        counter += 1
        if current != next:
            out += f"{counter}{current}"
            counter = 0
    return out


def parse_data(data: str) -> tuple[str, int]:
    return map(str.strip, data.split("\n"))


def solve(subject, repeats):
    for _ in range(int(repeats)):
        subject = look_and_say(subject)
    return len(subject)


def solve_1(data: str) -> int:
    subject, repeats, _ = parse_data(data)
    return solve(subject, repeats)


def solve_2(data: str) -> int:
    subject, _, repeats = parse_data(data)
    return solve(subject, repeats)
