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
     alert(this.menu.image);
   // console.log(" on change" +event);
    this.newImage.emit(this.menu.image);
    }
  constructor() { }

  ngOnInit() {}

  @Input() menu: Menu;
   
  ngOnChanges(){
      this.newImage.emit(this.menu.image);
  }
  
  changeBackgroundImage1(event){
   
     /*
     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var value = idAttr.nodeValue;
     if(value==1){
       document.getElementById(value).style.backgroundColor="green";
     }*/
     //alert('on click'+value);

     
   }

   showCatList(){
    //alert('on dbl click');
  }
}
