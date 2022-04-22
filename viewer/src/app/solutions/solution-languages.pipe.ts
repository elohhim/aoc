import { Pipe, PipeTransform } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { Language } from 'src/shared/model/language';

@Pipe({
  name: 'solutionLanguages',
})
export class SolutionLanguagesPipe implements PipeTransform {
  transform(eventKey: EventKey, ...args: unknown[]): Language[] {
    return ['Python', 'Java'];
  }
}
