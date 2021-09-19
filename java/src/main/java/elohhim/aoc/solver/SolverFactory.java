package elohhim.aoc.solver;

import elohhim.aoc.shared.PuzzleKey;
import io.vavr.collection.List;
import io.vavr.control.Either;
import java.util.Set;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

@Named
@Singleton
public class SolverFactory {

  private final Set<Solver> solvers;

  // Dagger does not work well with Lombok @RequiredArgsConstructor
  // see https://github.com/google/dagger/issues/2781
  @Inject
  public SolverFactory(Set<Solver> solvers) {
    this.solvers = solvers;
  }

  public Either<Throwable, Solver> getSolver(PuzzleKey puzzleKey) {
    return List.ofAll(solvers)
        .find(solver -> matchSolver(solver, puzzleKey))
        .toEither(() -> new SolverNotFoundException(puzzleKey));
  }

  private boolean matchSolver(Solver solver, PuzzleKey puzzleKey) {
    Solves annotation = solver.getClass().getAnnotation(Solves.class);
    PuzzleKey solverKey = PuzzleKey.of(annotation);
    return puzzleKey.equals(solverKey);
  }
}
