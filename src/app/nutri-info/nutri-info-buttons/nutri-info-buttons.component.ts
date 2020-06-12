import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nutri-info-buttons',
  templateUrl: './nutri-info-buttons.component.html',
  styleUrls: ['./nutri-info-buttons.component.css']
})
export class NutriInfoButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    var elementC = document.getElementById('0');
    elementC.classList.add("active");
    

  }
  navigateMenu = (iPosition, iCurrent) => {
    var elementC = document.getElementById(iCurrent);
    var elementP =document.getElementById(iPosition);
    elementC.classList.remove("active");
    elementP.classList.add("active");
    document.getElementById('current').innerHTML=iPosition;
  
  }
}
