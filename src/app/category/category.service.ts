import { Category } from './category.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Menu } from '../menu/menu.model';


@Injectable({ providedIn: 'root' })
export class CategoryService implements OnInit {
    menuId : number;
    public categoryItems: any;
    catLstLenFlag : boolean =false;
    showImageFlag = new EventEmitter<boolean>();
    showListFlag  = new EventEmitter<boolean>();
    constructor(private http:HttpClient){
        
    }
     
    getCategoryList(menuId){
     var categoryLoop: Category[] = [];
     this.catLstLenFlag =true;
     this.http.get('http://localhost:8081/apiInteractiveRetailStore/v1/categoryList/menu/'+menuId)
     .subscribe(category => {
                 this.categoryItems=category;
                 console.log(this.categoryItems.length);
                for(let res1 of this.categoryItems){
                   categoryLoop.push(new Category(res1.id, res1.subMenuName,
                        new Menu(res1.menuId.id, res1.menuId.menuName, res1.menuId.image,
                          res1.menuId.Active, res1.menuId.notification),
                          res1.image, res1.Active, res1.notification));
                }
            
               if(categoryLoop.length>0){
                 this.catLstLenFlag =false;
              }
             
              this.showImageFlag.emit(this.catLstLenFlag)

             }
           );
            this.categoryItems = categoryLoop;
            return this.categoryItems;
    }
    ngOnInit() {
       
    }
         
   }
  
