import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent} from './menu/menu.component';
import { MenuTabComponent } from './menu/menu-tab/menu-tab.component';
import { MenuImageComponent } from './menu/menu-image/menu-image.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuTabComponent,
    MenuImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
