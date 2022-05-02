package elohhim.aoc.solver.y2021.d01;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import io.vavr.collection.Stream;
import java.math.BigDecimal;
import java.util.List;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Solves(year = 2021, day = 1)
@Flogger
public class Y2021D01Solver implements Solver {

  @Override
  public String solve1(String data) {
    var depths = parseData(data);
    var solution =
        Stream.ofAll(depths).sliding(2).filter(ds -> ds.last().compareTo(ds.head()) > 0).size();
    return String.valueOf(solution);
  }

  @Override
  public String solve2(String data) {
    var depths = parseData(data);
    var solution =
        Stream.ofAll(depths)
            .sliding(3)
            .map(ds -> ds.reduce(BigDecimal::add))
            .sliding(2)
            .filter(ds -> ds.last().compareTo(ds.head()) > 0)
            .size();
    return String.valueOf(solution);
  }

  private List<BigDecimal> parseData(String data) {
    return data.lines().map(BigDecimal::new).toList();
  }
}
