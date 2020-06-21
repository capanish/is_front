import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { MenuService } from "../../menu/menu.service";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";
import { CategoryListComponent } from "./category-list/category-list.component";
//import { HubConnection } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";

//-------SignalR-Starts------
const data = { ready: false };
const apiBaseUrl = "http://localhost:8081/apiInteractiveRetailStore/v1";

//-------SignalR-Ends------

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  menuId: number;
  menuName: string;
  menuImage: string;
  categoryList: Category[];
  showMenuImg: any = "true";
  showScreen: string ='menu';

  //------SingnalR- variable declaration -Starts-----
  iPosition: any;
  @ViewChild(CategoryListComponent)
  categoryListComponent: CategoryListComponent;

  iMenuCount: number = 0;
  iColCount: number = 0;
  iRowCount: number = 0;
  //------SingnalR- variable declaration -Ends------

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit() {
    this.menuService.menuIdSelected.subscribe((resId) => {
      this.menuId = resId;
    });
    this.menuService.menuNameSelected.subscribe((resName) => {
      this.menuName = resName;
    });
    this.menuService.menuImageSelected.subscribe((resImgName) => {
      this.menuImage = resImgName;
    });
    this.menuService.selectedCategoryList.subscribe((resLst) => {
      this.categoryList = resLst;
    });
    this.menuService.showScreenE.subscribe((resImg) => {
      this.showMenuImg = resImg;
      this.showScreen = resImg;
     });
    this.categoryService.catCountE.subscribe((resCount) => {
      this.iMenuCount = resCount;
    });

    //--------------SignalR Connection -Starts---------------

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(apiBaseUrl + "/signalr")
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

  newMessage = (message) => {
console.log('cat new message');
    if (this.showScreen === "categoryList") {
      this.iPosition = document.getElementById("current").innerHTML;
      this.iColCount = parseInt(document.getElementById("colnum").innerHTML);
      this.iRowCount = this.iMenuCount / this.iColCount;
      this.setPosition(message.text, this.iMenuCount, this.iPosition);
    }
  };

  setPosition = (iGesture, iMenuCount, iPosition) => {
    var bLeft = false;
    var bRight = false;
    var bUp = false;
    var bDown = false;
    var bBack = false;
    var bClick = false;
    var bHome = false;
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
    } else if (iGesture == "home") {
      bHome = true;
    }

    if (bLeft == true && iPosition > 0) {
      var iPos = iCurrent - 1;
      if (iPos % this.iColCount < this.iRowCount - 1) {
        this.categoryListComponent.navigateMenu(iPos, iPosition);
      }
    } else if (bRight == true && iPosition < iMenuCount - 1) {
      var iPos = iCurrent + 1;
      if (iPos % this.iColCount > 0) {
        this.categoryListComponent.navigateMenu(iPos, iPosition);
      }
    } else if (bUp == true && iPosition / this.iColCount >= 1) {
      var iPos = iCurrent - this.iColCount;
      this.categoryListComponent.navigateMenu(iPos, iPosition);
    } else if (bDown == true && iPosition / this.iColCount < this.iRowCount - 1) {
      var iPos = iCurrent + this.iColCount;
      this.categoryListComponent.navigateMenu(iPos, iPosition);
    } else if (bBack == true) {
      console.log('category back'+this.menuId);
      window.location.href='/home';
      //window.history.back();

      // this.showScreen='menu';
      //console.log(this.showScreen);
     // this.location.back();
      // this.menuTabComponent.showCategoryList(iPos);
    } else if (bClick == true) {
      var iPos = iCurrent;
      this.categoryListComponent.showNutritionalInfo(iPos);
      /*	var cHref = $('#anchor'+ iPos).attr("href");
			window.location.href = cHref;*/
    } else if (bHome == true) {
      window.location.href = "/home";
    }
  };
}
