package elohhim.aoc.solver;

import elohhim.aoc.shared.PuzzleKey;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SolverNotFoundException extends RuntimeException {
  private final PuzzleKey puzzleKey;
}
