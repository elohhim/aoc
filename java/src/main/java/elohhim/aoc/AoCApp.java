package elohhim.aoc;

import elohhim.aoc.di.DIFramework;
import elohhim.aoc.di.spring.ApplicationConfig;
import elohhim.aoc.shared.AoCRunner;
import elohhim.aoc.shared.PuzzleKey;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

@Command(
    name = "AoCApp",
    description = "Runner application for Java based Advent of Code solutions",
    subcommands = {CommandLine.HelpCommand.class})
public class AoCApp {
  public static void main(String[] args) {
    int exitCode = new CommandLine(new AoCApp()).execute(args);
    System.exit(exitCode);
  }

  @Command(name = "solve", description = "Solve given AoC problem")
  private void solve(
      @Option(
              names = {"-d", "--di"},
              description =
                  "DI framework to use (${COMPLETION-CANDIDATES}). Default: ${DEFAULT-VALUE}",
              defaultValue = "SPRING")
          DIFramework diFramework,
      @Option(
              names = {"-i", "--input"},
              description = "Input directory. Default: ${DEFAULT-VALUE}",
              defaultValue = "../input")
          String inputPath,
      @Parameters(arity = "1", paramLabel = "<year>", description = "Year") int year,
      @Parameters(arity = "1", paramLabel = "<day>", description = "Day") int day) {

    var puzzleKey = PuzzleKey.of(year, day);
    switch (diFramework) {
      case SPRING -> runSpring(inputPath, puzzleKey);
      case DAGGER -> runDagger(inputPath, puzzleKey);
      default -> throw new UnsupportedOperationException(
              "DI support for " + diFramework + " not implemented yet");
    }
  }

  void runSpring(String inputPath, PuzzleKey puzzleKey) {
    try (var context = new AnnotationConfigApplicationContext(ApplicationConfig.class)) {
      context.getBean(AoCRunner.class).run(inputPath, puzzleKey);
    }
  }

  void runDagger(String inputPath, PuzzleKey puzzleKey) {
    throw new UnsupportedOperationException("DAGGER support not implemented yet");
  }
}
