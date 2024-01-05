import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { Observable, map } from 'rxjs';
import { IndexService } from 'src/app/+service/index.service';
import { FileMetadata } from 'src/shared/model/file-metadata';
import { SolutionKey } from 'src/shared/model/solution-key';
import { ExternalLinkDirective } from '../../lib/external-link.directive';
import { FileNamePipe } from '../../lib/file-name.pipe';
import { GitHubLinkPipe } from '../../lib/git-hub-link.pipe';
import { SolutionKeyProviderComponent } from '../solution-key-provider/solution-key-provider.component';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    ExternalLinkDirective,
    FileNamePipe,
    GitHubLinkPipe,
    MarkdownModule,
  ],
})
export class SolutionComponent {
  protected readonly solutionKey$: Observable<SolutionKey> =
    this.solutionKeyProvider.solutionKey$;
  protected readonly files$: Observable<
    {
      metadata: FileMetadata;
      pending: WritableSignal<boolean>;
    }[]
  > = this.solutionKey$.pipe(
    map((solutionKey) =>
      this.indexService.getSolutionFiles(solutionKey).map((metadata) => ({
        metadata,
        pending: signal(true),
      }))
    )
  );

  constructor(
    private indexService: IndexService,
    private solutionKeyProvider: SolutionKeyProviderComponent
  ) {}

  protected handleLoad($event: WritableSignal<boolean>): void {
    $event.set(false);
  }
}
