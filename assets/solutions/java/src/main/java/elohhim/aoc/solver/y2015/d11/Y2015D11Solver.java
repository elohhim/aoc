package elohhim.aoc.solver.y2015.d11;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import io.vavr.collection.Stream;
import java.util.regex.Pattern;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 11)
@Flogger
public class Y2015D11Solver implements Solver {

  private static Pattern forbiddenPattern = Pattern.compile("[^iol]*");
  private static Pattern pairsPattern = Pattern.compile(".*(.)\\1.*(.)\\2.*");

  @Override
  public String solve1(String data) {
    return nextPassword(data);
  }

  @Override
  public String solve2(String data) {
    return nextPassword(incrementPassword(nextPassword(data)));
  }

  private String nextPassword(String currentPassword) {
    var candidate = currentPassword;
    while (!validatePassword(candidate)) {
      candidate = incrementPassword(candidate);
    }
    return candidate;
  }

  private String incrementPassword(String password) {
    var splitIndex = password.length() - 1;
    var prefix = password.substring(0, splitIndex);
    var suffix = password.charAt(splitIndex);
    return suffix == 'z'
        ? incrementPassword(prefix) + "a"
        : prefix + String.valueOf((char) (suffix + 1));
  }

  private boolean validatePassword(String password) {
    return noForbiddenChars(password)
        && containsIncreasingSequence(password, 3)
        && containsNonOverlapingPairs(password);
  }

  private boolean noForbiddenChars(String password) {
    return forbiddenPattern.matcher(password).matches();
  }

  private boolean containsIncreasingSequence(String password, int windowSize) {
    return Stream.ofAll(password.chars().boxed())
        .sliding(windowSize)
        .toJavaStream()
        .anyMatch(window -> isWindowIncreasingSequence(window, windowSize));
  }

  private boolean isWindowIncreasingSequence(Stream<Integer> window, int windowSize) {
    return window
        .sliding(2)
        .take(windowSize - 1)
        .map(Stream::toArray)
        .forAll(pair -> pair.get(0).equals(pair.get(1) - 1));
  }

  private boolean containsNonOverlapingPairs(String password) {
    return pairsPattern.matcher(password).matches();
  }
}
