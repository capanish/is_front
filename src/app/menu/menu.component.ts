import { Component, OnInit, Input , NgModule, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import {Menu} from './menu.model';
import { FormsModule } from '@angular/forms';
import { Category } from './category/category.model';
import { MenuTabComponent } from '../menu/menu-tab/menu-tab.component';
//import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { CategoryService } from './category/category.service';
import { Router} from '@angular/router';

 //-------SignalR-Starts------
 const data = { ready : false};
 const apiBaseUrl = 'http://localhost:8081/apiInteractiveRetailStore/v1';
 var iMenuCount:number  = 0;
 //-------SignalR-Ends-------

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
  showScreen :string ='menu';

  //------SingnalR- variable declaration -Starts-----
  iPosition : any;
  @ViewChild  (MenuTabComponent) menuTabComponent: MenuTabComponent;
//------SingnalR- variable declaration -Ends------

constructor(private http: HttpClient, private menuService: MenuService,
   private categoryService : CategoryService, private router: Router) { }

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
   /*
   this.categoryService.showScreenE.subscribe(resImgF =>{
    this.showScreen= resImgF;
   });*/

   this.menuService.showScreenE.subscribe(resImgF =>{
    this.showScreen= resImgF;
   });

 //--------------SignalR Connection -Starts---------------
  const connection = new signalR.HubConnectionBuilder()
  .withUrl(apiBaseUrl+'/signalr')
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

 connection.on('newMessage', this.newMessage);
 connection.start()
   .then(() => data.ready = true)
   .catch(console.error)
   //--------------SignalR Connection -Ends---------------
}

ngAfterViewInit(){
  this.menuService.menuSelected.subscribe(resImgN => {
    this.imageName=resImgN;
  });
}

  //------------SignalR Methods -Start------------
 newMessage = (message) => {
  if(this.showScreen ==='menu'){
    this.iPosition=document.getElementById('current').innerHTML;
    this.setPosition(message.text, iMenuCount, this.iPosition);
  }
 }
 setPosition =(iGesture, iMenuCount, iPosition) =>{
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
    //	window.history.back();

		} else if (bClick == true) {

      var iPos = iCurrent;
       if(iPos==0){
          this.router.navigate(['/home/myList']);
          this.menuService.showScreenE.emit("myList");
        }else if(iPos==1){
          this.router.navigate(['/home/recipe']);
          this.menuService.showScreenE.emit("recipe");
          this.menuTabComponent.showRecipe();
        }else{
         // this.router.navigate(['/home/categories']);
          this.menuService.showScreenE.emit("categoryList");
          this.menuTabComponent.showCategoryList(iPos);
        }
    }
}
  //-----------SignalR Methods -End-----------

   }
