import { Menu } from './menu.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService implements OnInit {
    menuSelected = new EventEmitter<string>();
    menuIdSelected = new EventEmitter<number>();
    menuNameSelected = new EventEmitter<string>();
    menuImageSelected = new EventEmitter<string>();
    selectedCategoryList = new EventEmitter();
    nutritionalInformationEM = new EventEmitter();
    showScreenE = new EventEmitter<string>();
    sMenuId = new EventEmitter();
    public menuItems: any;
    public menuCount:number =0;
    menuCountE = new EventEmitter();

    apiBaseURL=environment.apiBaseUrl;

    constructor(private http:HttpClient){}

    getMenuItems(){
     var menuLoop: Menu[] = [];
     //'http://localhost:8081/apiInteractiveRetailStore/v1/menus'
     this.http.get(this.apiBaseURL+'menus')
     .subscribe(menu => {
               this.menuItems=menu;

             for(let menuItem of this.menuItems){
                menuLoop.push(new Menu(menuItem.id, menuItem.menuName,
                    menuItem.image,menuItem.Active,
                    menuItem.notification));
                    this.menuCount++;
            }
            this.menuCountE.emit(this.menuCount);
         }
       );


         this.menuItems = menuLoop;
         return this.menuItems;
 }

    ngOnInit() {

     }



    }

