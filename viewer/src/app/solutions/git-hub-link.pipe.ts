import { Pipe, PipeTransform } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { Language } from 'src/shared/model/language';
import { LinkService } from '../+service/link.service';

@Pipe({
  name: 'gitHubLink',
})
export class GitHubLinkPipe implements PipeTransform {
  constructor(private linkService: LinkService) {}

  transform(eventKey: EventKey, language: Language): string {
    return this.linkService.getGitHubLink(eventKey, language);
  }
}
