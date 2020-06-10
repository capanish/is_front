import { Component, OnInit, Input , NgModule, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import {Menu} from './menu.model';
import { FormsModule } from '@angular/forms';
import { Category } from '../category/category.model';
import { MenuTabComponent } from '../menu/menu-tab/menu-tab.component';
//import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';


 //-------Signal R-------
 const data = { ready : false};
 const apiBaseUrl = 'http://localhost:8081/apiInteractiveRetailStore/v1';
// function mymethod(){
//    alert ('m in');
//  }
var iMenuCount:number  = 0;
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
  //------Menu Content-----
  @Input() menu: Menu;
  bgImgObj : string = 'assets/images/recipes_new.jpeg';
  menuItem :Menu;
  menuId : number =0;
  menuName : string;
  menuItems:Menu[];
  categoryLst :Category[];
  imageName : string;
  
  //------SingnalR------
  iPosition : any;
  @ViewChild  (MenuTabComponent) menuTabComponent: MenuTabComponent;

  getMenuObj(menuItem){
    this.bgImgObj=menuItem.image;
    this.menuId = menuItem.id;
    this.menuName = menuItem.menuName;

 }

 ngOnInit() {
  this.menuItems = this.menuService.getMenuItems();
  this.menuService.menuCountE.subscribe(resCount =>{
    iMenuCount=resCount;
   });

   this.menuService.menuSelected.subscribe(resImgN => {
    this.imageName=resImgN;
  });
 
 
  const connection = new signalR.HubConnectionBuilder()
  .withUrl(apiBaseUrl+'/signalr')
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

 connection.on('newMessage', this.newMessage);
 connection.start()
   .then(() => data.ready = true)
   .catch(console.error)
}
constructor(private http: HttpClient, private menuService: MenuService) { }

  //-------Signal R-----
 // private hubConnection: signalR.HubConnection;

 newMessage = (message) => {
 
  this.iPosition=document.getElementById('current').innerHTML;
  console.log(this.iPosition);
  
 this.setPosition(message.text, iMenuCount, this.iPosition);

}


  setPosition =(iGesture, iMenuCount, iPosition) =>{
    console.log('m in setPosition iGesture : '+iGesture
    +' iMenuCount : '+iMenuCount+' iPosition : '+iPosition);

    var bLeft = false;
		var bRight = false;
		var iCurrent = parseInt(iPosition);
		var bBack = false;
		var bClick = false;
	
		if (iGesture == 'left') {
			bLeft = true;
		} else if (iGesture == 'right') {
			bRight = true;
		} else if (iGesture == "back") {
			bBack = true;
		} else if (iGesture == "click") {
			bClick = true;
		}
		
		if (bLeft == true && iPosition > 0) {
     	var iPos = iCurrent-1;
			this.menuTabComponent.navigateMenu(iPos, iPosition);
		} else if (bRight == true && iPosition < (iMenuCount-1)) {
        var iPos = iCurrent+1;
      	this.menuTabComponent.navigateMenu(iPos, iPosition);
		} else if (bBack == true) {
			window.history.back();
		} else if (bClick == true) {
			var iPos = iCurrent;
			//var cHref = $('#nav'+ iPos).attr("href");
			//window.location.href = cHref;
		}
  }
 

   }
