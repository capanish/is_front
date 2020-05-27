import { Component, OnInit, Input ,EventEmitter, Output, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import {Menu} from './menu.model';
import { FormsModule } from '@angular/forms';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
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

  bgImgObj : string = 'assets/images/veggies.jpg';
  menuItem :Menu;
  menuId : number =0;
  menuName : string;
  menuItems:Menu[];
 
  categoryLst :Category[];
  constructor(private http: HttpClient, private menuService: MenuService) { }
 
  ngOnInit() {
     this.menuItems = this.menuService.getMenuItems();
     }
   
    getMenuObj(menuItem){
     this.bgImgObj=menuItem.image;
     this.menuId = menuItem.id;
     this.menuName = menuItem.menuName;
     
  }
    
  



}
