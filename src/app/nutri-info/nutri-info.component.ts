import { Component, OnInit, Input} from '@angular/core';
import { NutriInfoService } from './nutriInfo.service';
import { CategoryService } from '../category/category.service';
import { MenuService } from '../menu/menu.service';
import { NutriInfo } from './nutriInfo.model';
@Component({
  selector: 'app-nutri-info',
  templateUrl: './nutri-info.component.html',
  styleUrls: ['./nutri-info.component.css']
})
export class NutriInfoComponent implements OnInit {
   
  //@Input()
  nutritionalInformation : NutriInfo;
  infoId : number;
  showScreen : string = 'menu';
  constructor(private nutriInfoService : NutriInfoService, private categoryService : CategoryService,
    private menuService : MenuService) { }

  ngOnInit() {
   
   this.categoryService.showScreenE.subscribe(resImgF =>{
       this.showScreen= resImgF;
    });
    /*this.menuService.nutritionalInformationEM.subscribe(resLst =>{
      console.log(resLst);
     this.nutritionalInformation=resLst;
     //console.log(this.nutritionalInformation.id);
   });
*/
   this.nutriInfoService.nutritionalInfoE.subscribe(res =>{
   this.nutritionalInformation=res;
   console.log(this.nutritionalInformation.id);
 });


  }

}
