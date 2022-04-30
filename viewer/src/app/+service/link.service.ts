import { Injectable } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { FileMetaData } from 'src/shared/model/file-meta-data';

// TODO: 2022-04-22 jk - TBD:
// [ ] external systems URLs should probably be extracted to configuration
// [ ] repository user should be configuration
// [ ] repository name should be configuration
// [ ] repository branch should be configuration
@Injectable({
  providedIn: 'root',
})
export class LinkService {
  getAocLink({ event, day }: EventKey): string {
    return `https://adventofcode.com/${event}/day/${day}`;
  }

  getGitHubLink({ repositoryPath }: FileMetaData): string {
    return `https://github.com/elohhim/aoc/blob/main/${repositoryPath}`;
  }
}
