package elohhim.aoc.input;

import elohhim.aoc.shared.PuzzleKey;
import io.vavr.control.Try;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;

@Named
@RequiredArgsConstructor
public class PuzzleLoader {

  private static final String INPUT_FILE_NAME = "input.txt";

  private final Loader loader;

  public Try<String> loadPuzzleData(String inputDirectory, PuzzleKey puzzleKey) {
    return loader.load(inputDirectory, puzzleKey, INPUT_FILE_NAME);
  }
}
