import { Component, OnInit, ViewChild } from "@angular/core";
import { NutriInfoService } from "./nutriInfo.service";
import { MenuService } from "../../menu.service";
import { NutriInfo } from "./nutriInfo.model";
import * as signalR from "@microsoft/signalr";
import { NutriInfoButtonsComponent } from "../nutri-info/nutri-info-buttons/nutri-info-buttons.component";
import { environment } from "./../../../../environments/environment";
//-------SignalR-Starts------
const data = { ready: false };
var iMenuCount: number = 5;
//-------SignalR-Ends-------

@Component({
  selector: "app-nutri-info",
  templateUrl: "./nutri-info.component.html",
  styleUrls: ["./nutri-info.component.css"],
})
export class NutriInfoComponent implements OnInit {
  nutritionalInformation: NutriInfo;
  infoId: number;
  showScreen: string;
  menuName: string;

  //------SingnalR- variable declaration -Starts-----
  iPosition: any;
  @ViewChild(NutriInfoButtonsComponent)
  nutriInfoButtonsComponent: NutriInfoButtonsComponent;
  apiBaseURL = environment.apiBaseUrl;
  //------SingnalR- variable declaration -Ends------

  constructor(
    private nutriInfoService: NutriInfoService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuService.showScreenE.subscribe((resImgF) => {
      this.showScreen = resImgF;
    });

    this.nutriInfoService.nutritionalInfoE.subscribe((res) => {
      this.nutritionalInformation = res;
    });

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

  //------------SignalR Methods -Start------------
  newMessage = (message) => {
    if (this.showScreen === "nutriInfo") {
      this.iPosition = document.getElementById("current").innerHTML;
      this.setPosition(message.text, iMenuCount, this.iPosition);
    }
  };
  setPosition = (iGesture, iMenuCount, iPosition) => {
    var bLeft = false;
    var bRight = false;
    var iCurrent = parseInt(iPosition);
    var bBack = false;
    var bClick = false;
    var bHome = false;

    if (iGesture == "left") {
      bLeft = true;
    } else if (iGesture == "right") {
      bRight = true;
    } else if (iGesture == "back") {
      bBack = true;
    } else if (iGesture == "click") {
      bClick = true;
    } else if (iGesture == "home") {
      bHome = true;
    }

    if (bLeft == true && iPosition > 0) {
      var iPos = iCurrent - 1;
      this.nutriInfoButtonsComponent.navigateMenu(iPos, iPosition);
    } else if (bRight == true && iPosition < iMenuCount - 1) {
      var iPos = iCurrent + 1;
      this.nutriInfoButtonsComponent.navigateMenu(iPos, iPosition);
    } else if (bBack == true) {
      this.showScreen = "categoryList";
      this.menuService.showScreenE.emit("categoryList");
    } else if (bClick == true) {
      var iPos = iCurrent;
    } else if (bHome == true) {
      window.location.href = "/home";
    }
  };
  //-----------SignalR Methods -End-----------
}
