import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'a[appExternalLink]',
})
export class ExternalLinkDirective {
  @HostBinding('attr.target') targetAttr = '_blank';
  @HostBinding('attr.rel') relAttr = 'noopener noreferrer';
}
