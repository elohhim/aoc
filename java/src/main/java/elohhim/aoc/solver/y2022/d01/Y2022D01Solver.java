package elohhim.aoc.solver.y2022.d01;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Solves(year = 2022, day = 1)
@Flogger
public class Y2022D01Solver implements Solver {

  @Override
  public String solve1(String data) {
    var result = parseData(data).mapToInt(inventory -> inventory.sum()).max();
    return String.valueOf(result);
  }

  @Override
  public String solve2(String data) {
    var result = -parseData(data).mapToInt(inventory -> -inventory.sum()).sorted().limit(3).sum();
    return String.valueOf(result);
  }

  private Stream<IntStream> parseData(String data) {
    return Arrays.stream(data.split("\\r?\\n\\r?\\n")).map(this::parseGroup);
  }

  private IntStream parseGroup(String group) {
    return group.lines().map(Integer::parseInt).mapToInt(Integer::intValue);
  }
}
