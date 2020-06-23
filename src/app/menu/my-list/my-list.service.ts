import { MyList } from './my-list.model';
import { EventEmitter, Injectable, OnInit ,Input} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Active } from '../../active.enum';

@Injectable({ providedIn: 'root' })
export class MyListService implements OnInit {

    public listItems: MyList[]=
    [new MyList(0, "Romaine ", "/assets/images/myListRomaine.jpg",Active.Y,0),
     new MyList(1, "Salami ", "/assets/images/myListSalami.jpg",Active.N,0),
     new MyList(2, "Green peas ", "/assets/images/myListGreenPeas.jpg",Active.N,0),
     new MyList(3, "Olive Oil", "/assets/images/myListGreenPeas.jpg",Active.Y,0),
     new MyList(4, "Garlic ", "/assets/images/myListGreenPeas.jpg",Active.N,0),
     new MyList(5, "Parmesan ", "/assets/images/myListGreenPeas.jpg",Active.N,0),
     new MyList(6, "Milk ", "/assets/images/myListGreenPeas.jpg",Active.Y,0),
     new MyList(7, "Eggs ", "/assets/images/myListGreenPeas.jpg",Active.N,0),
     new MyList(8, "Beer", "/assets/images/myListGreenPeas.jpg",Active.N,0)
    ];

    public listItemCount:number =0;
    @Input() mId =new EventEmitter<number>();

    menuNameE = new EventEmitter();
    constructor(private http:HttpClient){}

    ngOnInit() {

     }

     getMyListItems(){
       return this.listItems;
    }



    }
