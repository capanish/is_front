import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  NgModule,
} from "@angular/core";
import { Menu } from "./../menu.model";
import { MenuService } from "./../menu.service";
import { CategoryService } from "../category/category.service";
import { FormsModule } from "@angular/forms";
import { RecipeService } from "../recipe/recipe.service";
import { ActivatedRoute } from "@angular/router";

@NgModule({
  imports: [FormsModule],
})
@Component({
  selector: "app-menu-tab",
  templateUrl: "./menu-tab.component.html",
  styleUrls: ["./menu-tab.component.css"],
})
export class MenuTabComponent implements OnInit, OnChanges {
  @Output() menuItem = new EventEmitter();
  @Input() menu: Menu;
  @Input() iVal: any;
  categoryItemsList: any = [];
  selectedElementId: any;
  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Set background image for selected menu item
    this.menuService.menuSelected.emit(this.menuService.menuItems[0].image);
  }

  ngAfterViewInit() {
    var elementC = document.getElementById("0");
    elementC.classList.add("active");
    elementC.classList.add("selected");
  }

  ngOnChanges() {
    this.menuItem.emit(this.menu);
  }
  changeBackgroundImage(iVal) {
    this.menuService.menuSelected.emit(this.menuService.menuItems[iVal].image);
    this.menuService.showScreenE.emit("menu");
  }

  showCategoryList = (iVal) => {
    //Set menu id for selected menu item
    var elementId = document.getElementById(iVal).getAttribute("name");
    this.menuService.menuIdSelected.emit(parseInt(elementId));
    this.menuService.menuNameSelected.emit(
      this.menuService.menuItems[iVal].menuName
    );
    this.menuService.menuImageSelected.emit(
      this.menuService.menuItems[iVal].image
    );
    this.categoryItemsList = this.categoryService.getCategoryList(
      parseInt(elementId)
    );
    this.menuService.selectedCategoryList.emit(this.categoryItemsList);
  };

  showRecipe = () => {
    this.recipeService.getRecipeItems();
  };

  showMenuName = (iVal) => {
    this.menuService.menuNameSelected.emit(
      this.menuService.menuItems[iVal].menuName
    );
  };

  navigateMenu = (iPosition, iCurrent) => {
    var elementC = document.getElementById(iCurrent);
    var elementP = document.getElementById(iPosition);
    elementC.classList.remove("active");
    elementC.classList.remove("selected");
    elementP.classList.add("active");
    elementP.classList.add("selected");
    this.changeBackgroundImage(iPosition);
    document.getElementById("current").innerHTML = iPosition;
  };
}
