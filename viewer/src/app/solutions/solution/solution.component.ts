import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndexService } from 'src/app/+service/index.service';
import { FileMetadata } from 'src/shared/model/file-metadata';
import { SolutionKey } from 'src/shared/model/solution-key';
import { SolutionKeyProviderComponent } from '../solution-key-provider/solution-key-provider.component';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent {
  solutionKey$: Observable<SolutionKey> = this.solutionKeyProvider.solutionKey$;
  files$: Observable<FileMetadata[]> = this.solutionKey$.pipe(
    map((solutionKey) => this.indexService.getSolutionFiles(solutionKey))
  );

  constructor(
    private indexService: IndexService,
    private solutionKeyProvider: SolutionKeyProviderComponent
  ) {}
}
