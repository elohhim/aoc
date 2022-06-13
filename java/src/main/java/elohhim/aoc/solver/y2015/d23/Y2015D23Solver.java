package elohhim.aoc.solver.y2015.d23;

import elohhim.aoc.solver.Solver;
import elohhim.aoc.solver.Solves;
import io.vavr.Tuple;
import io.vavr.collection.HashMap;
import io.vavr.collection.Map;
import java.util.function.Function;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

/*
 * Not very fond of this one, could be much more elegant.
 */
@Named
@RequiredArgsConstructor
@Solves(year = 2015, day = 23)
@Flogger
public class Y2015D23Solver implements Solver {

  static record State(int instructionPointer, Map<String, Integer> registers) {}

  @Override
  public String solve1(String data) {
    return solve(data, 0);
  }

  @Override
  public String solve2(String data) {
    return solve(data, 1);
  }

  private String solve(String data, Integer initRegA) {
    var commands = data.lines().toArray(String[]::new);
    var initialState = new State(0, HashMap.of("a", initRegA, "b", 0));
    return process(commands, initialState)
        .registers
        .get("b")
        .map(v -> v.toString())
        .getOrElse("UNKNOWN");
  }

  private State process(String[] commands, State initialState) {
    var state = initialState;
    while (0 <= state.instructionPointer && state.instructionPointer < commands.length) {
      var command = commands[state.instructionPointer];
      state = applyCommand(command, state);
    }
    return state;
  }

  private State applyCommand(String command, State state) {
    String op = command.substring(0, 3);
    String[] args = command.substring(4).split(", ");
    return switch (op) {
      case "hlf" -> new State(state.instructionPointer + 1, hlf(state.registers, args[0]));
      case "tpl" -> new State(state.instructionPointer + 1, tpl(state.registers, args[0]));
      case "inc" -> new State(state.instructionPointer + 1, inc(state.registers, args[0]));
      case "jmp" -> new State(state.instructionPointer + Integer.valueOf(args[0]), state.registers);
      case "jie" -> jie(state, args[0], args[1]);
      case "jio" -> jio(state, args[0], args[1]);
      default -> new State(state.instructionPointer + 1, state.registers);
    };
  }

  private Map<String, Integer> hlf(Map<String, Integer> registers, String target) {
    return applyOp(registers, target, v -> v / 2);
  }

  private Map<String, Integer> tpl(Map<String, Integer> registers, String target) {
    return applyOp(registers, target, v -> v * 3);
  }

  private Map<String, Integer> inc(Map<String, Integer> registers, String target) {
    return applyOp(registers, target, v -> v + 1);
  }

  private <K, V> Map<K, V> applyOp(Map<K, V> registers, K target, Function<V, V> op) {
    return registers.map((k, v) -> k.equals(target) ? Tuple.of(k, op.apply(v)) : Tuple.of(k, v));
  }

  private State jie(State state, String target, String offset) {
    var effectiveOffset = isEven(state.registers.get(target).get()) ? Integer.valueOf(offset) : 1;
    return new State(state.instructionPointer + effectiveOffset, state.registers);
  }

  private State jio(State state, String target, String offset) {
    var effectiveOffset = state.registers.get(target).get().equals(1) ? Integer.valueOf(offset) : 1;
    return new State(state.instructionPointer + effectiveOffset, state.registers);
  }

  private boolean isEven(int number) {
    return number % 2 == 0;
  }
}
