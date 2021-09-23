package elohhim.aoc.architecture;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.junit.ArchTests;
import elohhim.aoc.architecture.rules.SelectedGeneralCodingRules;

@AnalyzeClasses(packages = "elohhim.aoc")
public class ArchitectureTest {

  @ArchTest
  public static final ArchTests generalCoding = ArchTests.in(SelectedGeneralCodingRules.class);
}
