import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  data$: Observable<string>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data$ = this.http
      .get('assets/README.md', {
        responseType: 'text',
      })
      .pipe(
        map((readme) => {
          const lastLine = readme.indexOf('## Development');
          return readme.slice(0, lastLine);
        })
      );
  }
}
