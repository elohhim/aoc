import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLinkDirective } from './external-link.directive';
import { AocLinkPipe } from './aoc-link.pipe';
import { GitHubLinkPipe } from './git-hub-link.pipe';
import { FileNamePipe } from './file-name.pipe';

@NgModule({
  declarations: [
    ExternalLinkDirective,
    AocLinkPipe,
    GitHubLinkPipe,
    FileNamePipe,
  ],
  imports: [CommonModule],
  exports: [ExternalLinkDirective, AocLinkPipe, GitHubLinkPipe, FileNamePipe],
})
export class LibModule {}
