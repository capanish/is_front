import { Component, OnInit, Input, OnChanges, Output, EventEmitter,NgModule } from '@angular/core';
import { Menu } from './../menu.model'
import { MenuService } from './../menu.service';
import { CategoryService } from '../../category/category.service';
import { FormsModule } from '@angular/forms';
import { NutriInfoService } from '../../nutri-info/nutriInfo.service';

@NgModule({
  imports: [
       FormsModule      
  ]
})

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.css']
})

export class MenuTabComponent implements OnInit,OnChanges {
  @Output() menuItem = new EventEmitter();
  @Input() menu: Menu;
   
  categoryItemsList: any=[];
  
  constructor(private menuService: MenuService, private categoryService : CategoryService,
    private nutriInfoService : NutriInfoService) { }

  ngOnInit() {
      //Set background image for selected menu item
       this.menuService.menuSelected.emit(this.menuService.menuItems[0].image);
       
    }
   
  ngOnChanges(){
   
     this.menuItem.emit(this.menu);
  }
  changeBackgroundImage(){
      this.menuService.menuSelected.emit(this.menu.image);
      this.categoryService.showScreenE.emit('menu');
      
    }
  showCategoryList(event){
    //Set menu id for selected menu item
    this.menuService.menuIdSelected.emit(event.target.id);
    this.menuService.menuNameSelected.emit(this.menu.menuName)
    this.categoryItemsList=this.categoryService.getCategoryList(event.target.id);
    this.menuService.selectedCategoryList.emit(this.categoryItemsList);
   
  
  }
}
