import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category.model';
import { MenuService } from '../../menu/menu.service';
import { NutriInfo } from '../../nutri-info/nutriInfo.model';
import { NutriInfoService } from '../../nutri-info/nutriInfo.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 
  @Input() iVal : any;
  @Input() cat : Category;
   selectedCatlist : any;
   nutrionalInformation : NutriInfo;

  constructor(private menuService : MenuService, private nutriInfoService : NutriInfoService,
    private categoryService : CategoryService) {
  }

  ngOnInit() {
    
   }
   ngAfterViewInit(){
    var elementC = document.getElementById('0');
    elementC.classList.add("active");
    this.showName(0);
   // elementC.classList.add("selected");

  }
   showName(iVal){
     var eleId=document.getElementById(iVal).getAttribute('name');
     var eleBGId='bg'+eleId;
     eleId='img'+eleId;
     document.getElementById(eleId).style.display="block";
     document.getElementById(eleBGId).style.display="block";
   }
    
   hideName(iVal){
    console.log('hideName : '+iVal);
      var eleId=document.getElementById(iVal).getAttribute('name');
      var eleBGId='bg'+eleId;
      eleId='img'+eleId;
      document.getElementById(eleId).style.display="none";
      document.getElementById(eleBGId).style.display="none";
    }

  showNutritionalInfo(iVal){
    this.categoryService.showScreenE.emit('none');
    var eleId=document.getElementById(iVal).getAttribute('name');
    this.nutrionalInformation=this.nutriInfoService.getNutritionalInfo(eleId);
    this.categoryService.nutritionalInformationE.emit(this.nutrionalInformation);
    //this.menuService.nutritionalInformationEM.emit(this.nutrionalInformation);
  }

  navigateMenu = (iPosition, iCurrent) => {
    var elementC = document.getElementById(iCurrent);
    var elementP =document.getElementById(iPosition);
    elementC.classList.remove("active");
    this.hideName(iCurrent);
    elementP.classList.add("active");
    this.showName(iPosition);
    document.getElementById('current').innerHTML=iPosition;
  
  }

   
  }