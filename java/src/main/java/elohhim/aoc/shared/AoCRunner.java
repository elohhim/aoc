package elohhim.aoc.shared;

import elohhim.aoc.input.Loader;
import elohhim.aoc.solver.SolverFactory;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

/**
 * Puzzle solving orchestrator class serving as a main business logic entry point for application.
 */
@Named
@RequiredArgsConstructor
@Flogger
public class AoCRunner {

  private final Loader loader;
  private final SolverFactory solverFactory;

  public void run(String inputPath, PuzzleKey puzzleKey) {
    System.out.println("Solving " + puzzleKey);
    var result =
        solverFactory
            .getSolver(puzzleKey)
            .flatMap(
                (solver) ->
                    loader.loadPuzzleData(inputPath, puzzleKey).toEither().map(solver::solve));
  }
}
