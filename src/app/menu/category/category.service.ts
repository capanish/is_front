import { Category } from './category.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Menu } from '../../menu/menu.model';
import { MenuService } from '../menu.service';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService implements OnInit {
    menuId : number;
    public categoryItems: any;
    catShowScreen : string ='menu';
   // showScreenE = new EventEmitter<string>();
    nutritionalInformationE = new EventEmitter();
    catCountE = new EventEmitter();
    public catCount:number =0;
    apiBaseURL = environment.apiBaseUrl;
    constructor(private http:HttpClient, private menuService : MenuService){  }

    getCategoryList(menuId){
     var categoryLoop: Category[] = [];
     this.catShowScreen ='menu';

     //'http://localhost:8081/apiInteractiveRetailStore/v1/categoryList/menu/
     this.http.get(this.apiBaseURL+'categoryList/menu/'+menuId)
     .subscribe(category => {
                this.categoryItems=category;
                for(let res1 of this.categoryItems){
                   categoryLoop.push(new Category(res1.id, res1.subMenuName,
                        new Menu(res1.menuId.id, res1.menuId.menuName, res1.menuId.image,
                          res1.menuId.Active, res1.menuId.notification),
                          res1.image, res1.Active, res1.notification));
                          this.catCount++;
                }
                this.catCountE.emit(this.catCount);
               if(categoryLoop.length>0){
                 this.catShowScreen ='categoryList';
              }
            //this.showScreenE.emit(this.catShowScreen);
           this.menuService.showScreenE.emit(this.catShowScreen);

             }
           );
            this.categoryItems = categoryLoop;

            return this.categoryItems;
    }
    ngOnInit() {

    }

   }

