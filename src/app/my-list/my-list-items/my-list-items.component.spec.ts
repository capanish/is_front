import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListItemsComponent } from './my-list-items.component';

describe('MyListItemsComponent', () => {
  let component: MyListItemsComponent;
  let fixture: ComponentFixture<MyListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
