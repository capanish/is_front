import { Recipe } from './recipe.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Active } from '../active.enum';

@Injectable({ providedIn: 'root' })
export class RecipeService implements OnInit {

    private recipeItems: Recipe[]=
    [new Recipe(1, "Greek Salad ", "image",Active.Y,0),
    new Recipe(2, "Caesar Salad ", "image",Active.Y,0),
    new Recipe(3, "Beef & Asparagus pasta toss ", "image",Active.Y,0),
    new Recipe(4, "One-Pot Sesame Chicken Noodles ", "image",Active.Y,0),
    new Recipe(5, "Lemon Curd Tart ", "image",Active.Y,0)];

    public recipeCount:number =0;

    constructor(private http:HttpClient){}

    ngOnInit() {

     }

     getRecipeItems(){
       return this.recipeItems;
    }


}

