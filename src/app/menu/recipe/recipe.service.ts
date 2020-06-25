import { Recipe } from './recipe.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Active } from '../../active.enum';
import { MenuService } from '../menu.service';

@Injectable({ providedIn: 'root' })
export class RecipeService implements OnInit {
  recipeCountE = new EventEmitter<any>();
  showScreenE =  new EventEmitter<any>();
  showScreen='recipe';
    private recipeItems: Recipe[]=
    [new Recipe(0, "Greek Salad ", "/assets/images/recipesGreekSalad.jpg",Active.Y,0),
    new Recipe(1, "Caesar Salad ", "/assets/images/recipesCaesarSalad.jpg",Active.Y,0),
    new Recipe(2, "Beef & Asparagus pasta toss ", "/assets/images/recipesBeefAsparagusPastaToss.jpg",Active.Y,0),
    new Recipe(3, "One-Pot Sesame Chicken Noodles ", "/assets/images/recipesGreekSalad.jpg",Active.Y,0),
    new Recipe(4, "Lemon Curd Tart ", "/assets/images/recipesGreekSalad.jpg",Active.Y,0)];

    constructor(private http:HttpClient, private menuService : MenuService){}

    ngOnInit() {
     }

     getRecipeItems(){
      this.recipeCountE.emit(this.recipeItems.length);
      this.showScreenE.emit('recipe');
       return this.recipeItems;
    }


}

