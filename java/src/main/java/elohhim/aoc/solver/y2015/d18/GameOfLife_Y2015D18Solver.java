package elohhim.aoc.solver.y2015.d18;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;

@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 18)
public class GameOfLife_Y2015D18Solver implements Solver {

  @Override
  public String solve(String data) {
    System.out.println("Santa's Game of Life aka Lights");
    System.out.println(data);
    return "15";
  }
}
