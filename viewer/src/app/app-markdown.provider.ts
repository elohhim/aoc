import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

// function that returns `MarkedOptions` with renderer override
function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(
      /^<a /,
      '<a target="_blank" rel="norefferer noopener" '
    );
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

export function provideAppMarkdown() {
  return importProvidersFrom(
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    })
  );
}
