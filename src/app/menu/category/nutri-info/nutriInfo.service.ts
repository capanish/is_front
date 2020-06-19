import { NutriInfo } from './nutriInfo.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CategoryService } from '../../category/category.service';
import { MenuService } from '../../menu.service';


@Injectable({ providedIn: 'root' })
export class NutriInfoService implements OnInit {
    subMenuId : number;
    public nutriInfo: NutriInfo;
    nutritionalInfoE = new EventEmitter();
    showScreenE =  new EventEmitter();
    constructor(private http:HttpClient , private categoryService : CategoryService,
        private menuService : MenuService){

    }

    getNutritionalInfo(subMenuId){
      //  var nutriInfV: NutriInfo[] = [];
        this.http.get<NutriInfo>('http://localhost:8081/apiInteractiveRetailStore/v1/nutriInfo/submenu/'+subMenuId)
            .subscribe(nutriInfR => {
                  this.nutriInfo=nutriInfR;
                  this.nutritionalInfoE.emit(this.nutriInfo);
                  if(this.nutriInfo != null){
                    this.showScreenE.emit('nutriInfo');
                    this.menuService.showScreenE.emit('nutriInfo');
                  }else{
                    this.menuService.showScreenE.emit('categoryList');
                    this.showScreenE.emit('categoryList');
                  }

                  // this.categoryService.showScreenE.emit('nutriInfo');

              });
          //  this.menuService.nutritionalInformationEM.emit(this.nutriInfo);

           return this.nutriInfo;
    }

    ngOnInit() {

    }
}
