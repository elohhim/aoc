package elohhim.aoc.runner;

import elohhim.aoc.input.PuzzleLoader;
import elohhim.aoc.shared.PuzzleKey;
import elohhim.aoc.solver.Solution;
import elohhim.aoc.solver.SolutionSupplier;
import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.SolverFactory;
import io.vavr.control.Either;
import java.util.logging.Level;
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

  private final SolutionSupplier solutionSupplier;
  private final PuzzleLoader loader;
  private final SolverFactory solverFactory;

  public void run(String inputPath, PuzzleKey puzzleKey) {
    log.at(Level.INFO).log("Solving: %s", puzzleKey);
    solverFactory
        .getSolver(puzzleKey)
        .flatMap(solver -> solve(inputPath, puzzleKey, solver))
        .peek(right -> handleSuccess(puzzleKey, right))
        .peekLeft(left -> handleError(puzzleKey, left));
  }

  private Either<Throwable, Solution> solve(String inputPath, PuzzleKey puzzleKey, Solver solver) {
    return loader
        .loadPuzzleData(inputPath, puzzleKey)
        .toEither()
        .map(data -> solutionSupplier.getSolution(data, solver));
  }

  private void handleSuccess(PuzzleKey puzzleKey, Solution solution) {
    log.at(Level.INFO).log("%s solution: %s", puzzleKey, solution);
  }

  private void handleError(PuzzleKey puzzleKey, Throwable cause) {
    log.at(Level.WARNING).withCause(cause).log("Could not solve %s!", puzzleKey);
  }
}
