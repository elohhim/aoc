import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    NgFor,
    NgIf,
  ],
})
export class SolutionComponent {
  protected readonly solutionKey$: Observable<SolutionKey> = this.solutionKeyProvider.solutionKey$;
  protected readonly files$: Observable<FileMetadata[]> = this.solutionKey$.pipe(
    map((solutionKey) => this.indexService.getSolutionFiles(solutionKey))
  );

  constructor(
    private indexService: IndexService,
    private solutionKeyProvider: SolutionKeyProviderComponent
  ) {}
}
