import { Component, OnInit, Input, OnChanges, Output, EventEmitter,NgModule } from '@angular/core';
import { Menu } from './../menu.model'
import {MenuService} from './../menu.service';
import { FormsModule } from '@angular/forms';

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
  @Output() newImage = new EventEmitter();
   newImg='';
   buttonId : number;
   updatedImage : string;
   changeBackgroundImage(event){
  
   this.newImg=this.menu.image;
   this.newImage.emit(this.menu.image);
    this.menuService.menuSelected.emit(this.menu.image);
    }
  constructor(private menuService: MenuService) { }

  ngOnInit() {
       this.menuService.menuSelected.emit(this.menuService.menuItems[0].image);
    }

  @Input() menu: Menu;
   
  ngOnChanges(){
      this.newImage.emit(this.menu.image);
  }
  showCatList(){
   
  }
}
