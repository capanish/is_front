import { NutriInfo } from "./nutriInfo.model";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MenuService } from "../../menu.service";
import { environment } from "./../../../../environments/environment";

@Injectable({ providedIn: "root" })
export class NutriInfoService implements OnInit {
  subMenuId: number;
  public nutriInfo: NutriInfo;
  nutritionalInfoE = new EventEmitter();
  showScreenE = new EventEmitter();
  apiBaseURL = environment.apiBaseUrl;
  constructor(private http: HttpClient, private menuService: MenuService) {}

  getNutritionalInfo(subMenuId) {
    this.http
      .get<NutriInfo>(this.apiBaseURL + "nutriInfo/submenu/" + subMenuId)
      .subscribe((nutriInfR) => {
        this.nutriInfo = nutriInfR;
        this.nutritionalInfoE.emit(this.nutriInfo);
        if (this.nutriInfo != null) {
          this.showScreenE.emit("nutriInfo");
          this.menuService.showScreenE.emit("nutriInfo");
        } else {
          this.menuService.showScreenE.emit("categoryList");
          this.showScreenE.emit("categoryList");
        }
      });
    return this.nutriInfo;
  }

  ngOnInit() {}
}
