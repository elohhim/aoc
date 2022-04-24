import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolutionsModule } from './solutions/solutions.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventSelectorComponent } from './event-selector/event-selector.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, EventSelectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SolutionsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
