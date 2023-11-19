import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MarkdownModule, MarkedOptions, MARKED_OPTIONS, MarkedRenderer } from 'ngx-markdown';

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
  };
}

export function provideAppMarkdown() {
  return importProvidersFrom(
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
    })
  );
}
