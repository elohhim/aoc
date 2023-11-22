from typing import List

Inventory = List[List[int]]


def parse_data(data: str) -> Inventory:
    return [[int(c) for c in d.split('\n')] for d in data.split('\n\n')];


def sum_of_top_n_inventory(inventory: Inventory, n: int) -> int:
    return sum(sorted(sum(i) for i in inventory)[-n:])


def solve_1(data: str) -> int:
    inventory = parse_data(data)
    return sum_of_top_n_inventory(inventory, 1)


def solve_2(data: str) -> int:
    inventory = parse_data(data)
    return sum_of_top_n_inventory(inventory, 3)
