import { Component, OnInit,Input } from '@angular/core';
import { Menu } from './../menu.model';
import { environment } from '../../../environments/environment';
import { CoreEnvironment } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { MenuService } from '../menu.service';
import { CategoryService } from '../../category/category.service';
@Component({
  selector: 'app-menu-image',
  templateUrl: './menu-image.component.html',
  styleUrls: ['./menu-image.component.css']
})
export class MenuImageComponent implements OnInit {
  @Input() menu: Menu;
   imageName : string;
   showImageFlag :boolean=true;
  
  //constructor(public environment: CoreEnvironment) { }
  constructor(private menuService : MenuService,private categoryService : CategoryService) { 

  }
  ngOnInit() {
    //environment.apiUrl;
   this.menuService.menuSelected.subscribe(resImgN => {
      this.imageName=resImgN;
    });
   
    this.categoryService.showImageFlag.subscribe(resImgF =>{
      this.showImageFlag= resImgF;
   });
  
  }

  
}
