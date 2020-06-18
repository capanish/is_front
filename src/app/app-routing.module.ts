import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../app/menu/menu.component';
import { CategoryComponent } from '../app/category/category.component';
import { NutriInfoComponent } from '../app/nutri-info/nutri-info.component';
import { RecipeComponent } from '../app/recipe/recipe.component';
import { MyListComponent } from '../app/my-list/my-list.component';

const routes: Routes = [
  {path: '', redirectTo:'/menu', pathMatch: 'full'},
  { path: 'menu', component: MenuComponent,
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
