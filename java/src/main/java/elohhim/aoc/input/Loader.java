package elohhim.aoc.input;

import elohhim.aoc.shared.PuzzleKey;
import io.vavr.control.Try;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;
import javax.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;

@Named
@RequiredArgsConstructor
@Flogger
public class Loader {

  public Try<String> load(String inputDirectory, PuzzleKey puzzleKey, String fileName) {
    return Try.of(() -> Files.readString(getInputFilePath(inputDirectory, puzzleKey, fileName)))
        .onSuccess(
            data -> {
              log.at(Level.INFO).log("Data loaded successfully...");
              log.at(Level.FINE).log(data);
            });
  }

  private Path getInputFilePath(String inputDirectory, PuzzleKey puzzleKey, String fileName) {
    return getPuzzleDirectoryPath(inputDirectory, puzzleKey).resolve(fileName);
  }

  private Path getPuzzleDirectoryPath(String inputDirectory, PuzzleKey puzzleKey) {
    var puzzleDirectory = String.format("%d//%02d", puzzleKey.year(), puzzleKey.day());
    return Paths.get(inputDirectory, puzzleDirectory);
  }
}
