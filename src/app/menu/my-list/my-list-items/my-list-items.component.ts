import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { MyList } from '../my-list.model';

@Component({
  selector: 'app-my-list-items',
  templateUrl: './my-list-items.component.html',
  styleUrls: ['./my-list-items.component.css']
})
export class MyListItemsComponent implements OnInit {

  @Output() listItem = new EventEmitter();
  @Input() item: MyList;
  @Input() iVal : any;
  constructor() { }

  ngOnInit() {
  }

}
