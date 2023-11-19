import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    MarkdownModule,
  ],
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
