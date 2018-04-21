import { Component } from '@angular/core';
import {AdjectiveService} from '../../services/adjective.service';

@Component({
  selector: 'app-tell-me',
  templateUrl: './tell-me.component.html',
  styleUrls: ['./tell-me.component.scss']
})
export class TellMeComponent {

  public name: string = '';
  public submitted: string;

  constructor(private _svc: AdjectiveService) { }

  public updateName(): void {
    if (this.name) {
      this.submitted = this.name;
      this._svc.setNext(this.name);
    }
  }
}
