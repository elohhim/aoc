import { Pipe, PipeTransform } from '@angular/core';
import { FileMetadata } from 'src/shared/model/file-metadata';
import { LinkService } from '../+service/link.service';

@Pipe({
  name: 'gitHubLink',
})
export class GitHubLinkPipe implements PipeTransform {
  constructor(private linkService: LinkService) {}

  transform(file: FileMetadata): string {
    return this.linkService.getGitHubLink(file);
  }
}
