import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent} from './menu/menu.component';
import { MenuTabComponent } from './menu/menu-tab/menu-tab.component';
import { MenuImageComponent } from './menu/menu-image/menu-image.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { NutriInfoComponent } from './nutri-info/nutri-info.component';
import { NutriInfoButtonsComponent } from './nutri-info/nutri-info-buttons/nutri-info-buttons.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MyListComponent } from './my-list/my-list.component';
import { RecipeItemsComponent } from './recipe/recipe-items/recipe-items.component';
import { MyListItemsComponent } from './my-list/my-list-items/my-list-items.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuTabComponent,
    MenuImageComponent,
    CategoryComponent,
    CategoryListComponent,
    NutriInfoComponent,
    NutriInfoButtonsComponent,
    RecipeComponent,
    MyListComponent,
    RecipeItemsComponent,
    MyListItemsComponent
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
