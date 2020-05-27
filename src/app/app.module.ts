import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent} from './menu/menu.component';
import { MenuTabComponent } from './menu/menu-tab/menu-tab.component';
import { MenuImageComponent } from './menu/menu-image/menu-image.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuTabComponent,
    MenuImageComponent,
    CategoryComponent,
    CategoryListComponent
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
