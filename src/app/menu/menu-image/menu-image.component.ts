import { Component, OnInit,Input } from '@angular/core';
import { Menu } from './../menu.model';
import { environment } from '../../../environments/environment';
import { CoreEnvironment } from '@angular/core/src/render3/jit/compiler_facade_interface';

@Component({
  selector: 'app-menu-image',
  templateUrl: './menu-image.component.html',
  styleUrls: ['./menu-image.component.css']
})
export class MenuImageComponent implements OnInit {
  @Input() menu: Menu;
  @Input() imageName : string;

  //constructor(public environment: CoreEnvironment) { }
  constructor() { }
  ngOnInit() {
    //environment.apiUrl;
  }
  
}
