package elohhim.aoc.shared;

import elohhim.aoc.solver.Solves;

public record PuzzleKey(int year, int day) {

  public static PuzzleKey of(int year, int day) {
    return new PuzzleKey(year, day);
  }

  public static PuzzleKey of(Solves solves) {
    return new PuzzleKey(solves.year(), solves.day());
  }
}
