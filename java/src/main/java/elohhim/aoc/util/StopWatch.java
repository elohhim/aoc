package elohhim.aoc.util;

import java.time.Clock;
import java.util.function.Supplier;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;

@Named
@RequiredArgsConstructor
public class StopWatch {
  private final Clock clock;

  public <T> Timed<T> wrap(Supplier<T> supplier) {
    var start = clock.millis();
    var result = supplier.get();
    var end = clock.millis();
    return new Timed<>(result, end - start);
  }
}
