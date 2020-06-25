import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-list-buttons',
  templateUrl: './my-list-buttons.component.html',
  styleUrls: ['./my-list-buttons.component.css']
})
export class MyListButtonsComponent implements OnInit {

  btnImageActive : Array<string>=['assets/images/TV_on.png','','assets/images/Eye_on.png',
  'assets/images/Send_on.png'];

  btnImageInActive : Array<string>=['assets/images/TV_off.png','','assets/images/Eye_off.png',
  'assets/images/Send_off.png'];

  @Input() btnImage : Array<string>=[];

  constructor() { }

  ngOnInit() {
    this.btnImage[0]=this.btnImageInActive[0];
    this.btnImage[2]=this.btnImageInActive[2];
    this.btnImage[3]=this.btnImageInActive[3];
  }

  navigateMenu = (iPosition, iCurrent) => {
    var elementC = document.getElementById(iCurrent);
    var elementLC = document.getElementById('lbl'+iCurrent);

    var elementP =document.getElementById(iPosition);
    var elementLP = document.getElementById('lbl'+iPosition);

    elementC.classList.remove("active");
    elementLC.classList.remove("active");
    this.btnImage[iCurrent]=this.btnImageInActive[iCurrent];

    elementP.classList.add("active");
    elementLP.classList.add("active");
    this.btnImage[iPosition]=this.btnImageActive[iPosition];
  }

  addRemoveButtonState(state){
    var elementB = document.getElementById('0');
    var elementL = document.getElementById('lbl0');
    if(state =='active'){
      elementB.classList.add("active");
      elementL.classList.add("active");
      this.btnImage[0]=this.btnImageActive[0];
  }else{
    elementB.classList.remove("active");
    elementL.classList.remove("active");
    this.btnImage[0]=this.btnImageInActive[0];
  }
}
}
