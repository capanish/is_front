import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent implements OnInit {

  @Output() recipeItem = new EventEmitter();
  @Input() recipe: Recipe;
  @Input() iVal : any;
  constructor() { }

  ngOnInit() {
  }
}
