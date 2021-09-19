package elohhim.aoc.input;

import elohhim.aoc.shared.PuzzleKey;
import io.vavr.control.Try;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;

@Named
@RequiredArgsConstructor
public class Loader {

  private static final String INPUT_FILE_NAME = "input.txt";

  public Try<String> loadPuzzleData(String inputDirectory, PuzzleKey puzzleKey) {
    return Try.of(() -> Files.readString(getInputFilePath(inputDirectory, puzzleKey)));
  }

  private Path getInputFilePath(String inputDirectory, PuzzleKey puzzleKey) {
    return getPuzzleDirectoryPath(inputDirectory, puzzleKey).resolve(INPUT_FILE_NAME);
  }

  private Path getPuzzleDirectoryPath(String inputDirectory, PuzzleKey puzzleKey) {
    var puzzleDirectory = String.format("%d//%02d", puzzleKey.year(), puzzleKey.day());
    return Paths.get(inputDirectory, puzzleDirectory);
  }
}
