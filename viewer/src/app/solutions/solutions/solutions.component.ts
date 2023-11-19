import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Observable } from 'rxjs';
import { EventKey } from 'src/shared/model/event-key';
import { AocLinkPipe } from '../../lib/aoc-link.pipe';
import { ExternalLinkDirective } from '../../lib/external-link.directive';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';
import { SolutionLanguagesPipe } from './solution-languages.pipe';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AocLinkPipe,
    AsyncPipe,
    ExternalLinkDirective,
    MarkdownModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SolutionLanguagesPipe,
  ],
})
export class SolutionsComponent {
  protected readonly eventKey$: Observable<EventKey> =
    this.eventKeyProvider.eventKey$;

  constructor(private eventKeyProvider: EventKeyProviderComponent) {}
}
