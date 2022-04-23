import { AssetPaths } from './asset-path';
import { Language } from './language';

/**
 * Leverage TS type system for generated data validation
 */
export interface SolutionsData {
  [event: number]: {
    [day: number]: {
      [language in Language]?: AssetPaths;
    };
  };
}
