import { pipe } from 'rxjs';
import { FileMetaData } from 'src/shared/model/file-meta-data';
import { FileNamePipe } from './file-name.pipe';

describe('FileNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FileNamePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    const pipe = new FileNamePipe();

    it('should return last segment of file path', () => {
      const file: FileMetaData = {
        repositoryPath: 'some/long/path/to/file.py',
        assetPath: '/assets/solutions/',
      };
      const result = pipe.transform(file);
      expect(result).toEqual('file.py');
    });
  });
});
