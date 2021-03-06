import { Component, OnInit, Input, ViewChild, Output } from "@angular/core";
import { MyList } from "./my-list.model";
import { MyListService } from "./my-list.service";
import * as signalR from "@microsoft/signalr";
import { MyListButtonsComponent } from "../my-list/my-list-buttons/my-list-buttons.component";
import { ActivatedRoute } from "@angular/router";
import { MenuService } from "../menu.service";
import { environment } from "./../../../environments/environment";

//-------SignalR-Starts------
const data = { ready: false };
var iMenuCount: number = 0;
var iItemCount: number = 5;
//-------SignalR-Ends-------

@Component({
  selector: "app-my-list",
  templateUrl: "./my-list.component.html",
  styleUrls: ["./my-list.component.css"],
})
export class MyListComponent implements OnInit {
  @Input() list: MyList;
  listItems: MyList[];
  imageName: string;
  showScreen: string = "menu";
  sMenuId: number;
  menuPos: any;
  menuName: string;

  //------SingnalR- variable declaration -Starts-----
  @ViewChild(MyListButtonsComponent)
  myListButtonsComponent: MyListButtonsComponent;
  apiBaseURL = environment.apiBaseUrl;
  //------SingnalR- variable declaration -Ends------

  constructor(
    private myListService: MyListService,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.listItems = this.myListService.getMyListItems();
    this.imageName = this.listItems[0].image;
    iMenuCount = this.listItems.length;

    this.route.queryParamMap.subscribe((params) => {
      this.menuPos = +params.get("tab") || 0;
    });
    this.menuName = this.menuService.menuItems[this.menuPos].menuName;
    //--------------SignalR Connection -Starts---------------
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiBaseURL + "signalr")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("newMessage", this.newMessage);
    connection
      .start()
      .then(() => (data.ready = true))
      .catch(console.error);
    //--------------SignalR Connection -Ends---------------
  }

  ngAfterViewInit() {
    var elementC = document.getElementById("nav0");
    elementC.classList.add("active");
    elementC.classList.add("selected");
    var elementCk = document.getElementById("ck0");
    elementCk.classList.add("checkBoxAct");
  }

  //------------SignalR Methods -Start------------
  newMessage = (message) => {
    // if(this.showScreen ==='myList'){
    var iPosition = document.getElementById("current").innerHTML;
    var iPositionLeft = document.getElementById("leftcurrent").innerHTML;
    var iPositionRight = document.getElementById("rightcurrent").innerHTML;
    this.setPosition(message.text, iPosition, iPositionLeft, iPositionRight);
    // }
  };

  setPosition = (iGesture, iPosition, iPositionLeft, iPositionRight) => {
    var bLeft = false;
    var bRight = false;
    var bUp = false;
    var bDown = false;
    var bBack = false;
    var bClick = false;
    var bHome = false;
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
    } else if (iGesture == "home") {
      bHome = true;
    }

    if (iCurrent == 0) {
      if (bRight == true) {
        var iPos = 0;
        this.navigateMenuSwitch(iCurrent, iPos, iCurrentLeft);
      } else if (bUp == true && iCurrentLeft - 1 >= 0) {
        var iPos = iCurrentLeft - 1;
        this.navigateMenuLeft(iPos, iCurrentLeft, 0);
      } else if (bDown == true && iCurrentLeft < iMenuCount - 1) {
        var iPos = iCurrentLeft + 1;
        this.navigateMenuLeft(iPos, iCurrentLeft, 1);
      } else if (bBack == true) {
        window.location.href = "/home";
      } else if (bClick == true) {
        var iPos = iCurrentLeft;
        this.imageName = this.listItems[iPos].image;
      } else if (bHome == true) {
        window.location.href = "/home";
      }
    } else if (iCurrent == 1) {
      if (bLeft == true && iCurrentRight > 0) {
        var iPos = iCurrentRight - 1;
        this.navigateMenuRight(iPos, iCurrentRight, 0);
      } else if (bLeft == true && iCurrentRight == 0) {
        var iPos = iCurrentLeft;
        this.navigateMenuSwitch(iCurrent, iPos, 0);
      }
      if (bRight == true && iCurrentRight < iItemCount - 1) {
        var iPos = iCurrentRight + 1;
        this.navigateMenuRight(iPos, iCurrentRight, 0);
      } else if (bBack == true) {
        window.location.href = "/home";
      } else if (bClick == true) {
      } else if (bHome == true) {
        window.location.href = "/home";
      }
    }
  };

  navigateMenuLeft(iPosition, iCurrent, iDirection) {
    document.getElementById("nav" + iCurrent).classList.remove("active");
    document.getElementById("nav" + iCurrent).classList.remove("selected");
    document.getElementById("ck" + iCurrent).classList.remove("checkBoxAct");

    document.getElementById("nav" + iPosition).classList.add("active");
    document.getElementById("ck" + iPosition).classList.add("checkBoxAct");
    document.getElementById("current").innerHTML = "0";
    document.getElementById("leftcurrent").innerHTML = iPosition;
  }

  navigateMenuRight(iPosition, iCurrent, iDirection) {
    if (iDirection == 0) {
      this.myListButtonsComponent.navigateMenu(iPosition, iCurrent);
    }
    document.getElementById("current").innerHTML = "1";
    document.getElementById("rightcurrent").innerHTML = iPosition;
  }

  navigateMenuSwitch(iCurrent, iPos, iCurrentLeft) {
    if (iCurrent == 0) {
      document.getElementById("nav" + iCurrentLeft).classList.remove("active");
      document
        .getElementById("nav" + iCurrentLeft)
        .classList.remove("selected");
      document.getElementById("ck" + iCurrentLeft).classList.remove("active");
      document.getElementById("nav" + iCurrentLeft).classList.add("inactive");
      document
        .getElementById("ck" + iCurrentLeft)
        .classList.add("checkBoxActDis");
      document.getElementById("ck" + iCurrentLeft).classList.add("inactive");
      document
        .getElementsByClassName("myListItemDiv")[0]
        .classList.add("inactive");
      document.getElementById("current").innerHTML = "1";
      this.myListButtonsComponent.addRemoveButtonState("active");
    } else if (iCurrent == 1) {
      this.myListButtonsComponent.addRemoveButtonState("inactive");
      document.getElementById("nav" + iPos).classList.remove("inactive");
      document.getElementById("nav" + iPos).classList.add("active");
      document.getElementById("ck" + iPos).classList.remove("inactive");
      document.getElementById("ck" + iPos).classList.add("active");
      document.getElementById("ck" + iPos).classList.remove("checkBoxActDis");
      document
        .getElementsByClassName("myListItemDiv")[0]
        .classList.remove("inactive");
      document.getElementById("current").innerHTML = "0";
    }
  }
  //-----------SignalR Methods -End-----------
}
