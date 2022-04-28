import { Pipe, PipeTransform } from '@angular/core';
import { FileMetaData } from 'src/shared/model/file-meta-data';
import { LinkService } from '../+service/link.service';

@Pipe({
  name: 'gitHubLink',
})
export class GitHubLinkPipe implements PipeTransform {
  constructor(private linkService: LinkService) {}

  transform(file: FileMetaData): string {
    return this.linkService.getGitHubLink2(file);
  }
}
