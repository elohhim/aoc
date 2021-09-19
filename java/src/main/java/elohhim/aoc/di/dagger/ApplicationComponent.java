package elohhim.aoc.di.dagger;

import elohhim.aoc.solver.SolverFactory;
import javax.inject.Singleton;

@Singleton
// @Component
public interface ApplicationComponent {

  SolverFactory getSolverFactory();
}
