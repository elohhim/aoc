import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionsComponent implements OnInit {

  event$: Observable<number> = this.activatedRoute.params.pipe(
    map((params) => params['event'])
  );
  day$: Observable<number> = this.activatedRoute.params.pipe(
    map((params) => params['day'])
  );;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
