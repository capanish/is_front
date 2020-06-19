import { Menu } from './menu.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class MenuService implements OnInit {
    menuSelected = new EventEmitter<string>();
    menuIdSelected = new EventEmitter<number>();
    menuNameSelected = new EventEmitter<string>();
    menuImageSelected = new EventEmitter<string>();
    selectedCategoryList = new EventEmitter();
    nutritionalInformationEM = new EventEmitter();
    showScreenE = new EventEmitter<string>();

    public menuItems: any;
    public menuCount:number =0;
    menuCountE = new EventEmitter();

    constructor(private http:HttpClient){}

    getMenuItems(){
     var menuLoop: Menu[] = [];
     this.http.get('http://localhost:8081/apiInteractiveRetailStore/v1/menus')
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

