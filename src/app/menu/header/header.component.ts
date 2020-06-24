import { Component, OnInit, Input } from '@angular/core';
import {formatDate , DatePipe} from '@angular/common';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 // @Input() dateTime: any;
  today= new Date();
  // todayNumber: number = Date.now();
  // todayDate : Date = new Date();
  constructor() { }

  ngOnInit() {

  }

}
