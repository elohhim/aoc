package elohhim.aoc.di.spring;

import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("elohhim.aoc")
public class ApplicationConfig {

  @Bean
  public Clock getClock() {
    return Clock.systemDefaultZone();
  }
}
