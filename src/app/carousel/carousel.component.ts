import { Component, OnInit } from "@angular/core";

//import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
var slideIndex = 0;
@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],

})
export class CarouselComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.showSlides();
  }

  showSlides() {
    var index;
    var htmlElement;
    var slides = document.getElementsByClassName("carouselmages");

    for (index = 0; index < slides.length; index++) {
      htmlElement = document.getElementsByClassName("carouselmages")[index];
      htmlElement.setAttribute("style", "display:none;");
    }
    slideIndex++;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    htmlElement = document.getElementsByClassName("carouselmages")[slideIndex - 1];
    htmlElement.setAttribute("style", "display:block;");
    setTimeout(() => {
      this.showSlides();
    }, 2000);
  }
}
