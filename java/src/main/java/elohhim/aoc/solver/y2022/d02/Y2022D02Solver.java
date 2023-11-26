package elohhim.aoc.solver.y2022.d02;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import java.util.function.BiFunction;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

/**
 * The solution is a little convoluted as I am exploring here some Java features.
 */
@Named
@RequiredArgsConstructor
@Solves(year = 2022, day = 2 )
@Flogger
public class Y2022D02Solver implements Solver {

  private static final Pattern pattern = Pattern.compile("([ABC]) ([XYZ])");

  @Override
  public String solve1(String data) {
    return String.valueOf(parseData(data, Hint.MOVE).score());
  }

  @Override
  public String solve2(String data) {
    return String.valueOf(parseData(data, Hint.OUTCOME).score());
  }

  private Strategy parseData(String data, Hint hint) {
    var rounds = data.lines().map(line -> parseLine(line, hint));
    return new Strategy(rounds);
  }

  private Round parseLine(String line, Hint hint) {
    var matcher = pattern.matcher(line);
    if (!matcher.matches()) {
        throw new IllegalArgumentException(STR."Malformed input line: \"\{line}\"");
    }
    return hint.parse.apply(matcher.group(1), matcher.group(2));
  }

  @RequiredArgsConstructor
  private enum Move {
    ROCK(1),
    PAPER(2),
    SCISSORS(3),
    ;

    public final int value;

    public static Move parse(String value) {
      return switch (value) {
        case "A", "X" -> Move.ROCK;
        case "B", "Y" -> Move.PAPER;
        case "C", "Z" -> Move.SCISSORS;
        default -> throw new IllegalArgumentException(STR."Malformed input Move: \"\{value}\"");
      };
    }

    public Move counter() {
      return switch (this) {
        case ROCK -> PAPER;
        case PAPER -> SCISSORS;
        case SCISSORS -> ROCK;
      };
    }

    public Move forOutcome(Outcome outcome) {
      return switch (outcome) {
          case LOOSE -> counter().counter();
          case DRAW -> this;
          case WIN -> counter();
      };
    }
  }

  @RequiredArgsConstructor
  private enum Outcome {
    LOOSE(0),
    DRAW(3),
    WIN(6),
    ;

    public final int value;

    public static Outcome parse(String value) {
      return switch (value) {
        case "X" -> LOOSE;
        case "Y" -> DRAW;
        case "Z" -> WIN;
        default -> throw new IllegalArgumentException(STR."Malformed input Outcome: \"\{value}\"");
      };
    }
  }

  @RequiredArgsConstructor
  private enum Hint {
    MOVE((v1, v2) -> new Round(Move.parse(v1), Move.parse(v2))),
    OUTCOME((v1, v2) -> {
      var opponentMove = Move.parse(v1);
      var outcome = Outcome.parse(v2);
      return new Round(opponentMove, opponentMove.forOutcome(outcome));
    }),
    ;

    private final BiFunction<String, String, Round> parse;
  }

  private record Strategy(Stream<Round> rounds) {
    int score() {
      return rounds.mapToInt(Round::score).sum();
    }
  }

  private record Round(Move opponentMove, Move myMove) {

    int score() {
      return myMove.value + outcome().value;
    }

    private Outcome outcome() {
      return opponentMove.equals(myMove)
              ? Outcome.DRAW
              : opponentMove.equals(myMove.counter())
                  ? Outcome.LOOSE
                  : Outcome.WIN;
    }
  }
}
