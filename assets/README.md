# Welcome to AoC Viewer

## What ?

This is simple web app for viewing [my](https://site.jankumor.pl) solutions for
[Advent of Code](https://adventofcode.com) puzzles.

The app resides in [one repository](https://github.com/elohhim/aoc) along with the
solutions and is build based on repository content.

## Why ?

You may ask, why making this app when there is GitHub already?

Well, I had some spare time recently, and wanted to use it for coding. As
it is always hard to come up with an idea for side project I took inspiration
from my work, where I recently took part in somehow similar project (it included
serving and rendering markdown files in Angular). I decided it will be a good
opportunity to consolidate gained knowledge and also gain better expertise about
some topics that I only barely touched previously (e.g. custom Angular CLI builders).

I hope this explains (even if just a little) choice of the technology (Angular), that
usually would not be the first that comes into mind for such use case.

## How ?

Built thanks to [Angular](https://angular.io/), [Marked](http://marked.js.org/), [Prism.js](http://prismjs.com/) and [ngx-markdown](https://github.com/jfcere/ngx-markdown) ❤️

Site look is ~a ripoff of~ heavily inspired by original AoC. I hope [Eric Wastl](http://was.tl)
won't mind and will took it as a tribute to his awesome work.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<!-- ### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities. -->

### Publishing to GitHub pages

Run `npm run deploy` to build production optimized version of an app (includes metadata generation in a predeploy step) and deploy it to GitHub pages.
