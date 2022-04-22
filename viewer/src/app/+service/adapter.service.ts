import { Injectable } from '@angular/core';
import { Language } from 'src/shared/+model/language';
import { Adapter } from 'src/shared/adapters/adapter';
import { ADAPTERS } from 'src/shared/adapters/adapter-registry';

/**
 * Bridge between Angular scoped code and global shared adapter registry.
 */
@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  constructor() {}

  resolve(language: Language): Adapter<typeof language> {
    return ADAPTERS[language];
  }
}
