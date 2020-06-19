import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListButtonsComponent } from './my-list-buttons.component';

describe('MyListButtonsComponent', () => {
  let component: MyListButtonsComponent;
  let fixture: ComponentFixture<MyListButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
