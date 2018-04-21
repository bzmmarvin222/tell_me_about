import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {NICE_ADJECTIVES} from './nice-adjectives.const';
import {BAD_ADJECTIVES, BAD_HAUKE} from './bad-adjectives.const';
import {TSMap} from 'typescript-map';

@Injectable()
export class AdjectiveService {

  private _fakeCache: TSMap<string, [string[], string[]]> = new TSMap<string, [string[], string[]]>();
  private _currentAdjectives$: Subject<[string[], string[]]> = new Subject<[string[], string[]]>();

  get currentAdjectives$(): Observable<[string[], string[]]> {
    return this._currentAdjectives$;
  }

  constructor() { }

  public setNext(name: string): void {
    const lowerCased: string = name.toLocaleLowerCase();
    let result: [string[], string[]];

    if (this._fakeCache.has(lowerCased)) {
      result = this._fakeCache.get(lowerCased);
    } else if (lowerCased === 'hauke') {
      result = this.handleHauke();
    } else if (lowerCased === 'guido' || lowerCased === 'matthias') {
      result = this.handleChef();
    } else {
      result = this.handleDefault();
    }

    this._fakeCache.set(lowerCased, result);
    this._currentAdjectives$.next(result);
  }

  private handleDefault(): [string[], string[]] {
    const nice: string[] = [];
    for (let i = 0; i < 4; i++) {
      let adj: string;
      while (!adj || nice.indexOf(adj) !== -1) {
        const rand = this.randomInt(NICE_ADJECTIVES.length);
        adj = NICE_ADJECTIVES[rand];
      }
      nice.push(adj);
    }
    const rand = this.randomInt(BAD_ADJECTIVES.length);
    const bad: string[] = [BAD_ADJECTIVES[rand]];
    return [nice, bad];
  }

  private handleHauke(): [string[], string[]] {
    const nice: string[] = [];
    const bad: string [] = BAD_HAUKE.concat(BAD_ADJECTIVES);
    return [nice, bad];
  }

  private handleChef(): [string[], string[]] {
    const nice: string[] = NICE_ADJECTIVES;
    const bad: string[] = [];
    return [nice, bad];
  }

  private randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
