package elohhim.aoc.input;

import elohhim.aoc.shared.PuzzleKey;
import io.vavr.control.Try;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

import javax.inject.Named;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;

@Named
@RequiredArgsConstructor
@Flogger
public class Loader {

  private static final String INPUT_FILE_NAME = "input.txt";

  public Try<String> loadPuzzleData(String inputDirectory, PuzzleKey puzzleKey) {
    return Try.of(() -> Files.readString(getInputFilePath(inputDirectory, puzzleKey)))
        .onSuccess(data -> log.at(Level.INFO).log("Data loaded successfully:\n%s", data));
  }

  private Path getInputFilePath(String inputDirectory, PuzzleKey puzzleKey) {
    return getPuzzleDirectoryPath(inputDirectory, puzzleKey).resolve(INPUT_FILE_NAME);
  }

  private Path getPuzzleDirectoryPath(String inputDirectory, PuzzleKey puzzleKey) {
    var puzzleDirectory = String.format("%d//%02d", puzzleKey.year(), puzzleKey.day());
    return Paths.get(inputDirectory, puzzleDirectory);
  }
}
