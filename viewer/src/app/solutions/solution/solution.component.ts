import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IndexService } from 'src/app/+service/index.service';
import { FileMetaData } from 'src/shared/model/file-meta-data';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent implements OnInit {
  eventKey = { event: 2015, day: 1 };
  language = 'Python' as const;
  files: FileMetaData[] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    this.files = this.indexService.getSolutionFiles({
      ...this.eventKey,
      language: this.language,
    });
  }
}
