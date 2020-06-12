import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NutriInfoService } from './nutriInfo.service';
import { CategoryService } from '../category/category.service';
import { MenuService } from '../menu/menu.service';
import { NutriInfo } from './nutriInfo.model';
import * as signalR from '@microsoft/signalr';
import { NutriInfoButtonsComponent } from '../nutri-info/nutri-info-buttons/nutri-info-buttons.component';

//-------SignalR-Starts------
const data = { ready: false };
const apiBaseUrl = 'http://localhost:8081/apiInteractiveRetailStore/v1';
var iMenuCount: number = 5;
//-------SignalR-Ends-------

@Component({
  selector: 'app-nutri-info',
  templateUrl: './nutri-info.component.html',
  styleUrls: ['./nutri-info.component.css']
})
export class NutriInfoComponent implements OnInit {

  //@Input()
  nutritionalInformation: NutriInfo;
  infoId: number;
  showScreen: string;

  //------SingnalR- variable declaration -Starts-----
  iPosition: any;
  @ViewChild(NutriInfoButtonsComponent) nutriInfoButtonsComponent: NutriInfoButtonsComponent;
  //------SingnalR- variable declaration -Ends------

  constructor(private nutriInfoService: NutriInfoService, private categoryService: CategoryService,
    private menuService: MenuService) { }

  ngOnInit() {

    this.categoryService.showScreenE.subscribe(resImgF => {
      this.showScreen = resImgF;
      console.log('resImgF : '+resImgF);
    });
    /*
   this.nutriInfoService.showScreenE.subscribe(resImgF => {
    console.log('resImgF : '+resImgF);
    this.showScreen = resImgF;
  });*/
  
    /*this.menuService.nutritionalInformationEM.subscribe(resLst =>{
      console.log(resLst);
     this.nutritionalInformation=resLst;
     //console.log(this.nutritionalInformation.id);
   });
*/
    this.nutriInfoService.nutritionalInfoE.subscribe(res => {
      this.nutritionalInformation = res;
      console.log(this.nutritionalInformation.id);
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


  
  //------------SignalR Methods -Start------------
 newMessage = (message) => {

  console.log('current in nutri info screen is : '+this.showScreen);
 if(this.showScreen ==='nutriInfo'){ 
   console.log('inside newMessage nutriInfo');
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
     this.nutriInfoButtonsComponent.navigateMenu(iPos, iPosition);
   } else if (bRight == true && iPosition < (iMenuCount-1)) {
       var iPos = iCurrent+1;
       this.nutriInfoButtonsComponent.navigateMenu(iPos, iPosition);
   } else if (bBack == true) {
     window.history.back();
   } else if (bClick == true) {
     var iPos = iCurrent;
     //this.nutriInfoButtonsComponent.showCategoryList(iPos);
   }
 }
 //-----------SignalR Methods -End-----------

}
