import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  bgImgObj : string = 'assets/images/recipes_new.jpeg';
  recipeItem :Recipe;
  recipeId : number =0;
  recipeName : string;
  recipes:Recipe[];
  imageName : string;
  //showScreen :string ='menu';

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipeItems();
  }

}
