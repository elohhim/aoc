import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IndexService } from 'src/app/+service/index.service';
import { ParamsResolveService } from 'src/app/+service/params-resolve.service';
import { FileMetaData } from 'src/shared/model/file-meta-data';
import { SolutionKey } from 'src/shared/model/solution-key';
import { SolutionKeyProviderComponent } from '../solution-key-provider/solution-key-provider.component';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent implements OnInit {
  solutionKey$: Observable<SolutionKey> = this.solutionKeyProvider.solutionKey$;
  files$: Observable<FileMetaData[]> = this.solutionKey$.pipe(
    map((solutionKey) => this.indexService.getSolutionFiles(solutionKey))
  );

  constructor(
    private indexService: IndexService,
    private solutionKeyProvider: SolutionKeyProviderComponent
  ) {}

  ngOnInit(): void {}
}
