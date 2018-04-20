import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AdjectiveService} from '../../../services/adjective.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input() public name: string;
  public adjectives$: Observable<[string[], strng[]]>;

  constructor(private _svc: AdjectiveService) { }

  ngOnInit() {
    this.adjectives$ = this._svc.currentAdjectives$;
  }

}
