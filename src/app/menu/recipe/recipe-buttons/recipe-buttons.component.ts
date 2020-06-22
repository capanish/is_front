import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-buttons',
  templateUrl: './recipe-buttons.component.html',
  styleUrls: ['./recipe-buttons.component.css']
})
export class RecipeButtonsComponent implements OnInit {

  btnImageActive : Array<string>=['assets/images/TV_on.png','','assets/images/Add_on.png',
  'assets/images/Recipe_on.png','assets/images/Send_on.png'];

  btnImageInActive : Array<string>=['assets/images/TV_off.png','','assets/images/Add_off.png',
  'assets/images/Recipe_off.png','assets/images/Send_off.png'];

  @Input() btnImage : Array<string>=[];

  constructor() { }

  ngOnInit() {
    this.btnImage[0]=this.btnImageInActive[0];
    this.btnImage[2]=this.btnImageInActive[2];
    this.btnImage[3]=this.btnImageInActive[3];
    this.btnImage[4]=this.btnImageInActive[4];
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
   /* if(iPosition !=1 && iCurrent !=0){
      this.btnImage[iPosition]=this.btnImageActive[iPosition];
      this.btnImage[iCurrent]=this.btnImageInActive[iCurrent];
    }*/
  }

  addRemoveButtonState(state){
    var elementB = document.getElementById('0');
    if(state==='active'){

      elementB.classList.add("active");
      elementB.classList.add("selected");
      this.btnImage[0]=this.btnImageActive[0];
  }else{
    elementB.classList.remove("active");
    elementB.classList.remove("selected");
    this.btnImage[0]=this.btnImageInActive[0];
  }
}
}
