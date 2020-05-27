import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  menuId : number;
  menuName : string;
 // selectedCategoryList : any;
  categoryList:Category[];
  showImg : boolean = true;
  showList : boolean = false;

  constructor(private menuService : MenuService,private categoryService : CategoryService) { }

  ngOnInit() { 
        this.menuService.menuIdSelected.subscribe(resId => {
        this.menuId=resId;
      });
      this.menuService.menuNameSelected.subscribe(resName => {
        this.menuName=resName;
      });
      this.menuService.selectedCategoryList.subscribe(resLst =>{
       this.categoryList=resLst;
     });
     this.categoryService.showImageFlag.subscribe(resImg =>{
        this.showImg= resImg;
       // this.menuService.show=resImg;
     });
     this.categoryService.showListFlag.subscribe(resLstF =>{
      this.showList= resLstF;
   });

      
   }

}
