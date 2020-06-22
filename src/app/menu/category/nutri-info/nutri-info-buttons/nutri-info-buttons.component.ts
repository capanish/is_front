import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nutri-info-buttons',
  templateUrl: './nutri-info-buttons.component.html',
  styleUrls: ['./nutri-info-buttons.component.css']
})
export class NutriInfoButtonsComponent implements OnInit {

  btnImageActive : Array<string>=['assets/images/TV_on.png','','assets/images/Add_on.png',
  'assets/images/Recipe_on.png','assets/images/Send_on.png'];

  btnImageInActive : Array<string>=['assets/images/TV_off.png','','assets/images/Add_off.png',
  'assets/images/Recipe_off.png','assets/images/Send_off.png'];

  @Input() btnImage : Array<string>=[];

  constructor() { }

  ngOnInit() {
    this.btnImage[0]=this.btnImageActive[0];
    this.btnImage[2]=this.btnImageInActive[2];
    this.btnImage[3]=this.btnImageInActive[3];
    this.btnImage[4]=this.btnImageInActive[4];
  }
  ngAfterViewInit(){
    var elementC = document.getElementById('0');
    elementC.classList.add("active");
    var elementL = document.getElementById('lbl0');
    elementL.classList.add("active");

  }
  navigateMenu = (iPosition, iCurrent) => {
    var elementC = document.getElementById(iCurrent);
    var elementLC = document.getElementById('lbl'+iCurrent);
    var elementP =document.getElementById(iPosition);
    var elementLP = document.getElementById('lbl'+iPosition);

    elementC.classList.remove("active");
    elementLC.classList.remove("active");
    elementP.classList.add("active");
    elementLP.classList.add("active");
    if(iPosition !=1 && iCurrent !=0){
      this.btnImage[iPosition]=this.btnImageActive[iPosition];
      this.btnImage[iCurrent]=this.btnImageInActive[iCurrent];
    }
      document.getElementById('current').innerHTML=iPosition;
    }
}
