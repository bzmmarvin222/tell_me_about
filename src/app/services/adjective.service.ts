import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {NICE_ADJECTIVES} from './nice-adjectives.const';
import {BAD_ADJECTIVES, BAD_HAUKE} from './bad-adjectives.const';

@Injectable()
export class AdjectiveService {

  private _currentAdjectives$: Subject<[string[], string[]]> = new Subject<[string[], string[]]>();

  get currentAdjectives$(): Observable<[string[], string[]]> {
    return this._currentAdjectives$;
  }

  constructor() { }

  public setNext(name: string): void {
    if (name.toLocaleLowerCase() === 'hauke') {
      this.handleHauke();
    } else if (name.toLocaleLowerCase() === 'guido' || name.toLocaleLowerCase() === 'matthias') {
      this.handleChef();
    } else {
      this.handleDefault();
    }
  }

  private handleDefault(): void {
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
    this._currentAdjectives$.next([nice, bad]);
  }

  private handleHauke(): void {
    const nice: string[] = [];
    const bad: string [] = BAD_HAUKE;
    this._currentAdjectives$.next([nice, bad]);
  }

  private handleChef(): void {
    const nice: string[] = NICE_ADJECTIVES;
    const bad: string[] = [];
    this._currentAdjectives$.next([nice, bad]);
  }

  private randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
