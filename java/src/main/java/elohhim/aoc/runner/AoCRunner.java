package elohhim.aoc.runner;

import elohhim.aoc.input.Loader;
import elohhim.aoc.shared.PuzzleKey;
import elohhim.aoc.solver.SolverFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

import javax.inject.Named;
import java.util.logging.Level;

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
    log.at(Level.INFO).log("Solving: %s", puzzleKey);
    solverFactory
        .getSolver(puzzleKey)
        .flatMap(
            (solver) -> loader.loadPuzzleData(inputPath, puzzleKey).toEither().map(solver::solve))
        .peek(right -> handleSuccess(puzzleKey, right))
        .peekLeft(left -> handleError(puzzleKey, left));
  }

  private void handleSuccess(PuzzleKey puzzleKey, String result) {
    log.at(Level.INFO).log("%s solution: %s", puzzleKey, result);
  }

  private void handleError(PuzzleKey puzzleKey, Throwable cause) {
    log.at(Level.WARNING).withCause(cause).log("Could not solve %s!", puzzleKey);
  }
}
