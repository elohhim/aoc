package elohhim.aoc.solver.y2015.d14;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import io.vavr.Tuple;
import io.vavr.Tuple2;
import io.vavr.collection.List;
import io.vavr.control.Option;
import java.util.logging.Level;
import java.util.regex.Pattern;
import java.util.stream.IntStream;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 14)
@Flogger
public class Y2015D14Solver implements Solver {

  static record Reindeer(String name, int velocity, int flightTime, int restTime) {}

  private static final int RACE_END = 2503;
  private static final Pattern pattern =
      Pattern.compile(
          "([A-Z][a-z]*) can fly ([0-9]+) km/s for ([0-9]+) seconds, but then must rest for"
              + " ([0-9]+) seconds\\.");

  @Override
  public String solve1(String data) {
    var parsed = parseData(data);
    var raceEnd = parsed._1;
    var reindeers = parsed._2;
    return calculateLeaderAfter(reindeers, raceEnd)._2.toString();
  }

  @Override
  public String solve2(String data) {
    var parsed = parseData(data);
    var raceEnd = parsed._1;
    var reindeers = parsed._2;
    var leadersOverTime =
        IntStream.rangeClosed(1, raceEnd).mapToObj(time -> calculateLeaderAfter(reindeers, time));
    return List.ofAll(leadersOverTime)
        .groupBy(Tuple2::_1)
        .map((reindeer, leadingTimes) -> Tuple.of(reindeer, leadingTimes.length()))
        .maxBy(Tuple2::_2)
        .peek(max -> log.at(Level.INFO).log("Most points: %s", max))
        .getOrElseThrow(() -> new RuntimeException("No max value."))
        ._2
        .toString();
  }

  private Tuple2<Integer, List<Reindeer>> parseData(String data) {
    var raceEnd = Integer.parseInt(data.lines().findFirst().orElseThrow());
    var reindeers =
        List.ofAll(
            data.lines().skip(1).map(this::parseLine).filter(Option::isDefined).map(Option::get));
    return Tuple.of(raceEnd, reindeers);
  }

  private Option<Reindeer> parseLine(String line) {
    var matcher = pattern.matcher(line.trim());
    return matcher.matches()
        ? Option.some(
            new Reindeer(
                matcher.group(1),
                Integer.parseInt(matcher.group(2)),
                Integer.parseInt(matcher.group(3)),
                Integer.parseInt(matcher.group(4))))
        : Option.none();
  }

  private int calculatePositionAfter(Reindeer reindeer, int time) {
    var cycleTime = reindeer.flightTime + reindeer.restTime;
    var fullCycles = time / cycleTime;
    var lastCycleTime = time % cycleTime;
    var lastCycleFlightTime = Math.min(reindeer.flightTime, lastCycleTime);
    return (fullCycles * reindeer.flightTime + lastCycleFlightTime) * reindeer.velocity;
  }

  private Tuple2<Reindeer, Integer> calculateLeaderAfter(List<Reindeer> reindeers, int time) {
    return reindeers
        .map(reindeer -> Tuple.of(reindeer, calculatePositionAfter(reindeer, time)))
        .maxBy(Tuple2::_2)
        .peek(max -> log.at(Level.FINE).log("Fastest reindeer after %d s: %s", time, max))
        .getOrElseThrow(() -> new RuntimeException("No max value."));
  }
}
