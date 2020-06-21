import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import * as signalR from '@microsoft/signalr';
import { RecipeButtonsComponent } from '../recipe/recipe-buttons/recipe-buttons.component';
import { MenuService } from '../menu.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

 //-------SignalR-Starts------
 const data = { ready : false};
 const apiBaseUrl = 'http://localhost:8081/apiInteractiveRetailStore/v1';
 var iMenuCount:number  = 0;
 var iItemCount:number  = 5;
 //-------SignalR-Ends-------

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  recipes:Recipe[];
  @Input() imageName : string;
  showScreen : string= 'recipe';

  //------SingnalR- variable declaration -Starts-----
    @ViewChild  (RecipeButtonsComponent) recipeButtonsComponent: RecipeButtonsComponent;
  //------SingnalR- variable declaration -Ends------

  constructor(private recipeService: RecipeService, private menuService : MenuService,
    private location : Location, private route: Router) { }

  ngOnInit() {

    this.recipes=this.recipeService.getRecipeItems();
    this.imageName=this.recipes[0].image;
    iMenuCount=this.recipes.length;

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
    var elementC = document.getElementById('nav0');
    elementC.classList.add("active");
    elementC.classList.add("selected");

  }
 //------------SignalR Methods -Start------------
 newMessage = (message) => {
 // if(this.showScreen ==='recipe'){
    console.log('inside new message recipe');
    var iPosition=document.getElementById('current').innerHTML;
    var iPositionLeft = document.getElementById('leftcurrent').innerHTML;
		var iPositionRight = document.getElementById('rightcurrent').innerHTML;
    this.setPosition(message.text,  iPosition, iPositionLeft, iPositionRight);
 // }
 }

setPosition =(iGesture, iPosition, iPositionLeft, iPositionRight) =>{
  var bLeft = false;
  var bRight = false;
  var bUp = false;
  var bDown = false;
  var bBack = false;
  var bClick = false;
  var iCurrent = parseInt(iPosition);
  var iCurrentLeft = parseInt(iPositionLeft);
  var iCurrentRight = parseInt(iPositionRight);

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

	if (iCurrent == 0) { console.log('inside icurren0 block');
    if (bRight == true) {
      var iPos = 0;
      this.navigateMenuSwitch(iCurrent, iPos, iCurrentLeft);

    } else if (bUp == true && ((iCurrentLeft - 1) >= 0)) {
      var iPos = iCurrentLeft - 1;
      this.navigateMenuLeft(iPos, iCurrentLeft, 0);

    } else if (bDown == true && (iCurrentLeft < (iMenuCount-1))) {
       var iPos = iCurrentLeft + 1;
      this.navigateMenuLeft(iPos, iCurrentLeft, 1);

    } else if (bBack == true) {
      console.log('inside 0 back');
      window.location.href='/home';
     // window.history.go(-1);
    // this.location.back();
     //this.route.navigate(['/home']);
    } else if (bClick == true) {
      var iPos = iCurrentLeft; console.log('inside 0 click'+iCurrentLeft );
      this.imageName=this.recipes[iPos].image;
    }
  } else if (iCurrent == 1) {
    console.log('inside icurren1 block');
    if (bLeft == true && iCurrentRight > 0) {
       var iPos = iCurrentRight-1;
      this.navigateMenuRight(iPos, iCurrentRight, 0);
    } else if (bLeft == true && iCurrentRight == 0) {
      var iPos = iCurrentLeft;
      this.navigateMenuSwitch(iCurrent, iPos, 0);

    }
    if (bRight == true && iCurrentRight < (iItemCount-1)) {

      var iPos = iCurrentRight+1;

      this.navigateMenuRight(iPos, iCurrentRight, 0);

    } else if (bBack == true) {
      console.log('inside 1 back');
      window.location.href='/home';
    //  window.history.back();
      // this.location.back();
      //this.route.navigate(['/home']);
    } else if (bClick == true) {
      console.log('inside 1 click');
      var iPos = iCurrent;
      this.imageName=this.recipes[iPos].image;
      // var cHref = "menu.html";
      // window.location.href = cHref;
    }
  }
}


navigateMenuLeft(iPosition, iCurrent, iDirection) {

  document.getElementById('nav'+iCurrent).classList.remove("active");
  document.getElementById('nav'+iCurrent).classList.remove("selected");
  document.getElementById('nav'+iPosition).classList.add("active");
  document.getElementById('current').innerHTML="0";
  document.getElementById('leftcurrent').innerHTML=iPosition;
}

 navigateMenuRight(iPosition, iCurrent, iDirection) {
	if (iDirection == 0) {
    this.recipeButtonsComponent.navigateMenu(iPosition,iCurrent);
  }

  document.getElementById('current').innerHTML="1";
  document.getElementById('rightcurrent').innerHTML=iPosition;
}
navigateMenuSwitch(iCurrent, iPos, iCurrentLeft) { console.log(' navigateMenuSwitch : '+iCurrent);
  if (iCurrent == 0) {
    document.getElementById('nav'+iCurrentLeft).classList.remove("active");
    document.getElementById('nav'+iCurrentLeft).classList.remove("selected");
    document.getElementById('nav'+iCurrentLeft).classList.add("inactive");
    document.getElementsByClassName('recipeItemDiv')[0].classList.add("inactive");
    document.getElementById('current').innerHTML="1";
    this.recipeButtonsComponent.addRemoveButtonState('active');

  } else if (iCurrent == 1) {
     this.recipeButtonsComponent.addRemoveButtonState('inactive');
    document.getElementById('nav'+iPos).classList.remove("inactive");
    document.getElementById('nav'+iPos).classList.add("active");
    document.getElementsByClassName('recipeItemDiv')[0].classList.remove("inactive");
    document.getElementById('current').innerHTML="0";
   }
}

  //-----------SignalR Methods -End-----------
}
