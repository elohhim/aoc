import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { EventKey } from 'src/shared/model/event-key';
import { isLanguage, Language } from 'src/shared/model/language';

@Injectable({
  providedIn: 'root',
})
export class ParamsResolveService {
  constructor() {}

  resolveEventKey(params: Params): EventKey {
    const { event, day } = params;
    if (typeof event === 'string' && typeof day === 'string') {
      return {
        event: parseInt(event),
        day: parseInt(day),
      };
    }
    throw new Error(
      `[${this.constructor.name}] Invalid route params [${JSON.stringify(
        params
      )}]`
    );
  }

  resolveLanguage(params: Params): Language {
    const { language } = params;
    if (isLanguage(language)) {
      return language;
    }
    throw new Error(`[${this.constructor.name}] Invalid route params`);
  }
}
