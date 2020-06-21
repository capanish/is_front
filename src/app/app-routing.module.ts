import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../app/menu/menu.component';
import { CategoryComponent } from './menu/category/category.component';
import { NutriInfoComponent } from './menu/category/nutri-info/nutri-info.component';
import { RecipeComponent } from './menu/recipe/recipe.component';
import { MyListComponent } from './menu/my-list/my-list.component';

const routes: Routes = [
  { path: 'home/menu/:menuId', component: MenuComponent},
   { path: 'home', component: MenuComponent,

   children: [
    {path: 'myList', component: MyListComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: 'categories', component: CategoryComponent,
      children: [
        { path: 'information', component: NutriInfoComponent }
      ]
     }
  ]
  }
];
  /*
 {path: 'menu', component: MenuComponent},
 {path: 'categories', component: CategoryComponent},
 { path: 'information', component: NutriInfoComponent }
]*/




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
