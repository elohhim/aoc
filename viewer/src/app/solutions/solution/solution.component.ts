import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IndexService } from 'src/app/+service/index.service';
import { AssetPaths } from 'src/shared/model/asset-path';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent implements OnInit {
  eventKey = { event: 2015, day: 1 };
  language = 'Python' as const;
  assets: AssetPaths = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    this.assets = this.indexService.getAssetPaths({
      ...this.eventKey,
      language: this.language,
    });
  }
}
