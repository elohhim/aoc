import { Pipe, PipeTransform } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { LinkService } from '../+service/link.service';

@Pipe({
    name: 'aocLink',
    standalone: true,
})
export class AocLinkPipe implements PipeTransform {
  constructor(private linkService: LinkService) {}

  transform(eventKey: EventKey): string {
    return this.linkService.getAocLink(eventKey);
  }
}
