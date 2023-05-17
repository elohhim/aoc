import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExternalLinkDirective } from '../lib/external-link.directive';
import { EventSelectorComponent } from './event-selector/event-selector.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [EventSelectorComponent, ExternalLinkDirective],
})
export class NavigationComponent {
  constructor() {}
}
