import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import {MessagesService} from "./messages.service";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: false
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log('MessagesComponent - constructor');
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(errors => this.showMessages = !!errors.length)
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
