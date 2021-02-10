import click
from importlib import import_module
from util import read_input, read_tc, test


@click.group()
def cli() -> None:
    click.echo('Advent of Code solution')


@cli.command()
@click.argument('year', type=int)
@click.argument('day', type=int)
def solve(year: int, day: int) -> None:
    click.echo(f'Year {year}, Day {day}')
    module = import_module(f'{year}.{day:02d}')
    data = read_input(year, day)

    tc1 = read_tc(year, day, 1)
    if tc1:
        test(module.solve_1, tc1)
    click.echo(f'Solution 1: {module.solve_1(data)}')

    tc2 = read_tc(year, day, 2)
    if tc2:
        test(module.solve_2, tc2)
    click.echo(f'Solution 2: {module.solve_2(data)}')


if __name__ == '__main__':
    cli()
