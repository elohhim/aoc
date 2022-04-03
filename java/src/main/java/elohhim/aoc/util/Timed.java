package elohhim.aoc.util;

import java.util.function.Supplier;

public record Timed<T>(T result, long time) {

  public static <T2> Timed<T2> wrap(Supplier<T2> function) {
    var start = System.currentTimeMillis();
    var result = function.get();
    var end = System.currentTimeMillis();
    return new Timed<>(result, end - start);
  }
}
