package elohhim.aoc.solver.y2015.d18;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

import javax.inject.Named;
import java.util.logging.Level;

@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 18)
@Flogger
public class GameOfLife_Y2015D18Solver implements Solver {

  @Override
  public String solve(String data) {
    log.at(Level.INFO).log("Santa's Game of Life aka Lights");
    return "15";
  }
}
