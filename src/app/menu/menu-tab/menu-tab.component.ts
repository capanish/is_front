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
   changeBackgroundImage(){
     this.newImage.emit({id: this.buttonId})
   }
  constructor() { }

  ngOnInit() {
  /*  var i, btnLen=document.getElementsByClassName('button').length;
  var colors[]= {};
    for(i=0;i<btnLen;i++){
      if(i%1==0){alert('m in 1');
      
       document.getElementsByName(i).
      }
      if(i==2){alert('m in 2');
        document.getElementById(i).style.backgroundColor='890924';
      }
    }
*/
  }

  @Input() menu: Menu;
   
  ngOnChanges(){
    alert('on changes');
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
