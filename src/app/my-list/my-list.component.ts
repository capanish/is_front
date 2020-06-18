import { Component, OnInit, Input } from '@angular/core';
import { MyList } from './my-list.model';
import { MyListService } from './my-list.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  @Input() list: MyList;
  bgImgObj : string = 'assets/images/recipes_new.jpeg';
  listItem :MyList;
  itemId : number =0;
  itemName : string;
  listItems:MyList[];
  imageName : string;
  //showScreen :string ='menu';

  constructor(private myListService: MyListService) { }

  ngOnInit() {
    this.listItems=this.myListService.getMyListItems();
  }

}
