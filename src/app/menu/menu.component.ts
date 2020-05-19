import { Component, OnInit, Input ,EventEmitter, Output, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import {Menu} from './menu.model';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
       FormsModule      
  ]
})
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;

  newImgObj : string = 'assets/images/veggies.jpg';
  menuItems:Menu[];
  constructor(private http: HttpClient, private menuService: MenuService) { }
  ngOnInit() {
    //this.changeBtnBGColor();
    this.menuItems = this.menuService.getMenuItems();
   }
   getNewImageObj(newImgObj){
      this.newImgObj=newImgObj;
  }
   changeBtnBGColor(){}



}
