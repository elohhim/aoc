import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent implements OnInit {
  eventKey = { event: 2010, day: 10 };
  language = 'Java' as const;

  constructor() {}

  ngOnInit(): void {}
}
