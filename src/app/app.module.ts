import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent} from './menu/menu.component';
import { MenuTabComponent } from './menu/menu-tab/menu-tab.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './menu/category/category.component';
import { CategoryListComponent } from './menu/category/category-list/category-list.component';
import { NutriInfoComponent } from './menu/category/nutri-info/nutri-info.component';
import { NutriInfoButtonsComponent } from './menu/category/nutri-info/nutri-info-buttons/nutri-info-buttons.component';
import { RecipeComponent } from './menu/recipe/recipe.component';
import { MyListComponent } from './menu/my-list/my-list.component';
import { RecipeItemsComponent } from './menu/recipe/recipe-items/recipe-items.component';
import { MyListItemsComponent } from './menu/my-list/my-list-items/my-list-items.component';
import { RecipeButtonsComponent } from './menu/recipe/recipe-buttons/recipe-buttons.component';
import { MyListButtonsComponent } from './menu/my-list/my-list-buttons/my-list-buttons.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuTabComponent,
    CategoryComponent,
    CategoryListComponent,
    NutriInfoComponent,
    NutriInfoButtonsComponent,
    RecipeComponent,
    MyListComponent,
    RecipeItemsComponent,
    MyListItemsComponent,
    RecipeButtonsComponent,
    MyListButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
