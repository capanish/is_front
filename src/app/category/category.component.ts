import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CategoryListComponent} from './category-list/category-list.component';
//import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';


 //-------SignalR-Starts------
 const data = { ready : false};
 const apiBaseUrl = 'http://localhost:8081/apiInteractiveRetailStore/v1';

 //-------SignalR-Ends------

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  menuId : number;
  menuName : string;
  menuImage : string;
  categoryList:Category[];
  showMenuImg : boolean = true;
  showScreen :string;

   //------SingnalR- variable declaration -Starts-----
   iPosition : any;
   @ViewChild  (CategoryListComponent) categoryListComponent: CategoryListComponent;
    iMenuCount:number  = 0;
    iColCount : number = 0;
    iRowCount : number= 0;
 //------SingnalR- variable declaration -Ends------

  constructor(private menuService : MenuService,private categoryService : CategoryService) { }

  ngOnInit() { 
    this.menuService.menuIdSelected.subscribe(resId => {
      this.menuId=resId;
    });
    this.menuService.menuNameSelected.subscribe(resName => {
      this.menuName=resName;
    });
    this.menuService.menuImageSelected.subscribe(resImgName => {
      this.menuImage=resImgName;
    });
    this.menuService.selectedCategoryList.subscribe(resLst =>{
      this.categoryList=resLst;
   });
    this.categoryService.showScreenE.subscribe(resImg =>{
      this.showMenuImg= resImg;
      this.showScreen=resImg;
   });
   this.categoryService.catCountE.subscribe(resCount =>{
    this. iMenuCount=resCount;
   });
  
   /*
   this.categoryService.showScreenE.subscribe(resImgF =>{
    this.showScreen= resImgF;
 });
*/

   //--------------SignalR Connection -Starts---------------
 
  //  this.menuService.menuCountE.subscribe(resCount =>{
  //   this. iMenuCount=resCount;
  //  });
  const connection = new signalR.HubConnectionBuilder()
  .withUrl(apiBaseUrl+'/signalr')
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

 connection.on('newMessage', this.newMessage);
 connection.start()
   .then(() => data.ready = true)
   .catch(console.error)
 
  //  console.log('this.iMenuCount : '+this.iMenuCount +' this.iColCount : '+this.iColCount +
  //  'this.iRowCount : ' +this.iRowCount);
   //--------------SignalR Connection -Ends---------------
  
   }


   
   newMessage = (message) =>{ 
  
   console.log('current screen is : '+this.showScreen);
  
   if(this.showScreen ==='categoryList'){ 
    this.iPosition=document.getElementById('current').innerHTML;
    this.iColCount  = parseInt(document.getElementById('colnum').innerHTML);
    this.iRowCount = this.iMenuCount / this.iColCount;
    console.log('this.iMenuCount : '+this.iMenuCount +' this.iColCount : '+this.iColCount +
    'this.iRowCount : ' +this.iRowCount);
    this.setPosition(message.text, this.iMenuCount, this.iPosition);
   }
	}

	 setPosition =   (iGesture, iMenuCount, iPosition) =>{
    console.log('iGesture : ' +iGesture+' set position in cat ' +(iPosition / this.iColCount) );
		var bLeft = false;
		var bRight = false;
		var bUp = false;
		var bDown = false;
		var bBack = false;
		var bClick = false;
		var iCurrent = parseInt(iPosition);
		
		if (iGesture == "left") {
			bLeft = true;
		} else if (iGesture == "right") {
			bRight = true;
		} else if (iGesture == "up") {
			bUp = true;
		} else if (iGesture == "down") {
			bDown = true;
		} else if (iGesture == "back") {
			bBack = true;
		} else if (iGesture == "click") {
			bClick = true;
		}
		
		if (bLeft == true && iPosition > 0) {
      console.log('cat left');
			var iPos = iCurrent-1;
			if ((iPos % this.iColCount) < (this.iRowCount - 1)) {
       	this.categoryListComponent.navigateMenu(iPos, iPosition);
			}
		} else if (bRight == true && iPosition < (iMenuCount-1)) {
      console.log('cat right');
			var iPos = iCurrent+1;
			if ((iPos % this.iColCount) > 0) {
				this.categoryListComponent.navigateMenu(iPos, iPosition);
			}
		} else if (bUp == true && ((iPosition / this.iColCount) >= 1)) {
      console.log('cat up' + 'iCurrent : '+iCurrent+' this.iColCount :'+this.iColCount);
       var iPos = iCurrent - this.iColCount;
       console.log('iPos : '+iPos +' iPosition');
			 this.categoryListComponent.navigateMenu(iPos, iPosition);
		} else if (bDown == true && ((iPosition / this.iColCount) < (this.iRowCount - 1))) {
      console.log('cat down');
			var iPos = iCurrent + this.iColCount;
		  this.categoryListComponent.navigateMenu(iPos, iPosition);
		} else if (bBack == true) {
			window.history.back();
		} else if (bClick == true) {
      var iPos = iCurrent;
      this.categoryListComponent.showNutritionalInfo(iPos);
		/*	var cHref = $('#anchor'+ iPos).attr("href");
			window.location.href = cHref;*/
		}
	}

}
