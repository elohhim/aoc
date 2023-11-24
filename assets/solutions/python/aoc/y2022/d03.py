type Item = str
type Compartment = str
type Rucksack = tuple[Compartment, Compartment]
type Group = tuple[Rucksack, Rucksack, Rucksack]


def parse_row(row: str) -> Rucksack:
    midpoint = len(row) // 2
    return (row[:midpoint], row[midpoint:])


def parse_data(data: str) -> list[Rucksack]:
    rows = data.split("\n")
    return [parse_row(row) for row in rows]


def get_item_priority(item: Item) -> int:
    return ord(item) - (96 if item.islower() else 38)


def get_rucksack_priority(rucksack: Rucksack) -> int:
    dupe = (set(rucksack[0]) & set(rucksack[1])).pop()
    return get_item_priority(dupe)


def solve_1(data: str) -> int:
    rucksacks = parse_data(data)
    return sum(get_rucksack_priority(r) for r in rucksacks)


def group_rucksacks(rucksacks: list[Rucksack]) -> list[Group]:
    return list(zip(rucksacks[:-2:3], rucksacks[1:-1:3], rucksacks[2::3]))


def rucksack2set(rucksack: Rucksack) -> set[Item]:
    return set(rucksack[0] + rucksack[1])


def get_group_priority(group: Group) -> int:
    r1, r2, r3 = group
    badge = (rucksack2set(r1) & rucksack2set(r2) & rucksack2set(r3)).pop()
    return get_item_priority(badge)


def solve_2(data: str) -> int:
    rucksacks = parse_data(data)
    groups = group_rucksacks(rucksacks)
    return sum(get_group_priority(g) for g in groups)
