import { Category } from './category.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Menu } from '../menu/menu.model';
import { NutriInfo } from '../nutri-info/nutriInfo.model';

@Injectable({ providedIn: 'root' })
export class CategoryService implements OnInit {
    menuId : number;
    public categoryItems: any;
    catLstLenFlag : string ='menu';
    showScreenE = new EventEmitter<string>();
    nutritionalInformationE = new EventEmitter();
   
    constructor(private http:HttpClient){
        
    }
     
    getCategoryList(menuId){
     var categoryLoop: Category[] = [];
     this.catLstLenFlag ='menu';
     this.http.get('http://localhost:8081/apiInteractiveRetailStore/v1/categoryList/menu/'+menuId)
     .subscribe(category => {
                this.categoryItems=category;
                 for(let res1 of this.categoryItems){
                   categoryLoop.push(new Category(res1.id, res1.subMenuName,
                        new Menu(res1.menuId.id, res1.menuId.menuName, res1.menuId.image,
                          res1.menuId.Active, res1.menuId.notification),
                          res1.image, res1.Active, res1.notification));
                }
            
               if(categoryLoop.length>0){
                 this.catLstLenFlag ='categoryList';
              }
             this.showScreenE.emit(this.catLstLenFlag)
             }
           );
            this.categoryItems = categoryLoop;
           
            return this.categoryItems;
    }
    ngOnInit() {
       
    }
         
   }
  
