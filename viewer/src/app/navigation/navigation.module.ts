import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibModule } from '../lib/lib.module';
import { EventSelectorComponent } from './event-selector/event-selector.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [NavigationComponent, EventSelectorComponent],
  imports: [CommonModule, RouterModule, LibModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
