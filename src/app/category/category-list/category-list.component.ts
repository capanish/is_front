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
 
  @Input() cat : Category;
   selectedCatlist : any;
   nutrionalInformation : NutriInfo;

  constructor(private menuService : MenuService, private nutriInfoService : NutriInfoService,
    private categoryService : CategoryService) {
  }

  ngOnInit() {
    
   }

   showName(event){
     var eleId='img'+event.target.id;
     document.getElementById(eleId).style.display="block";
   }
    
   hideName(event){
    var eleId='img'+event.target.id;
    document.getElementById(eleId).style.display="none";
  }

  showNutritionalInfo(event){
    this.categoryService.showScreenE.emit('none');
    this.nutrionalInformation=this.nutriInfoService.getNutritionalInfo(event.target.id);
    this.categoryService.nutritionalInformationE.emit(this.nutrionalInformation);
    //this.menuService.nutritionalInformationEM.emit(this.nutrionalInformation);
  }
  }