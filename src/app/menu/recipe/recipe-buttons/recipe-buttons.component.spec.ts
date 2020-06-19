import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeButtonsComponent } from './recipe-buttons.component';

describe('RecipeButtonsComponent', () => {
  let component: RecipeButtonsComponent;
  let fixture: ComponentFixture<RecipeButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
