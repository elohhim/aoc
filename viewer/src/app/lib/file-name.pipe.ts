import { Pipe, PipeTransform } from '@angular/core';
import { FileMetaData } from 'src/shared/model/file-meta-data';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform({ repositoryPath }: FileMetaData): unknown {
    return repositoryPath.split('/').pop();
  }
}
