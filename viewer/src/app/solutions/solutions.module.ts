import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AocLinkPipe } from './aoc-link.pipe';
import { GitHubLinkPipe } from './git-hub-link.pipe';
import { SolutionsComponent } from './solutions.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionLanguagesPipe } from './solution-languages.pipe';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    SolutionsComponent,
    AocLinkPipe,
    GitHubLinkPipe,
    SolutionComponent,
    SolutionLanguagesPipe,
  ],
  imports: [CommonModule, RouterModule, MarkdownModule.forChild()],
  exports: [SolutionsComponent],
})
export class SolutionsModule {}
