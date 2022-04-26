import { Pipe, PipeTransform } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { Language } from 'src/shared/model/language';
import { IndexService } from '../../+service/index.service';

@Pipe({
  name: 'solutionLanguages',
})
export class SolutionLanguagesPipe implements PipeTransform {
  constructor(private indexService: IndexService) {}

  transform(eventKey: EventKey): Language[] {
    return this.indexService.getSolutionLanguages(eventKey);
  }
}
