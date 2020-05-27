import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category.model';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  //@Input() category: Category;
  @Input() cat : Category;
   selectedCatlist : any;

  constructor(private menuService : MenuService) {
  }

  ngOnInit() {
   }

   showName(event){
     var eleId='img'+event.target.id;
     document.getElementById(eleId).style.display="block";
   }
    
   hideName(event){
    //alert(event.target.id);
    var eleId='img'+event.target.id;
    //alert(eleId);
     document.getElementById(eleId).style.display="none";
  }

  }