package elohhim.aoc.solver.y2015.d20;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import io.vavr.Tuple;
import io.vavr.collection.Stream;
import java.util.function.Function;
import java.util.function.IntPredicate;
import java.util.stream.IntStream;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 20)
@Flogger
public class Y2015D20Solver implements Solver {

  @Override
  public String solve1(String data) {
    return solve(data, this::getHousePresentsCount1);
  }

  @Override
  public String solve2(String data) {
    return solve(data, this::getHousePresentsCount2);
  }

  private String solve(String data, Function<Integer, Integer> presentCountStrategy) {
    int threshold = Integer.valueOf(data);
    return Stream.iterate(1, i -> i + 1)
        .map(houseNumber -> Tuple.of(houseNumber, presentCountStrategy.apply(houseNumber)))
        .find(t -> t._2 > threshold)
        .get()
        .toString();
  }

  private int getHousePresentsCount1(int houseNumber) {
    return getDivisorsOf(houseNumber).sum() * 10;
  }

  private int getHousePresentsCount2(int houseNumber) {
    return getDivisorsOf(houseNumber).filter(divisor -> houseNumber / divisor <= 50).sum() * 11;
  }

  private IntStream getDivisorsOf(int number) {
    var limit = (int) Math.ceil(Math.sqrt(number + 1));
    return IntStream.range(1, limit)
        .filter(isDivisorOf(number))
        .flatMap(divisor -> IntStream.of(divisor, number / divisor))
        .distinct();
  }

  private IntPredicate isDivisorOf(int number) {
    return (candidate) -> number % candidate == 0;
  }
}
