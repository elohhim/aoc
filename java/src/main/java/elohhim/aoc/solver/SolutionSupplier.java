package elohhim.aoc.solver;

import elohhim.aoc.util.StopWatch;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;

@Named
@RequiredArgsConstructor
public class SolutionSupplier {
  private final StopWatch stopWatch;

  public Solution getSolution(String data, Solver solver) {
    var first = stopWatch.wrap(() -> solver.solve1(data));
    var second = stopWatch.wrap(() -> solver.solve2(data));
    return new Solution(first, second);
  }
}
