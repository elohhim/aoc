import { Pipe, PipeTransform } from '@angular/core';
import { FileMetadata } from 'src/shared/model/file-metadata';

@Pipe({
    name: 'fileName',
    standalone: true,
})
export class FileNamePipe implements PipeTransform {
  transform({ repositoryPath }: FileMetadata): unknown {
    return repositoryPath.split('/').pop();
  }
}
