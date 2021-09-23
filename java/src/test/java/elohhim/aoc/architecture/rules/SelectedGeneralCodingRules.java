package elohhim.aoc.architecture.rules;

import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import com.tngtech.archunit.library.GeneralCodingRules;

public class SelectedGeneralCodingRules {
  @ArchTest
  public static final ArchRule stdStreams =
      GeneralCodingRules.NO_CLASSES_SHOULD_ACCESS_STANDARD_STREAMS;

  @ArchTest
  public static final ArchRule genericExceptions =
      GeneralCodingRules.NO_CLASSES_SHOULD_THROW_GENERIC_EXCEPTIONS;

  @ArchTest
  public static final ArchRule fieldInjection =
      GeneralCodingRules.NO_CLASSES_SHOULD_USE_FIELD_INJECTION;
}
