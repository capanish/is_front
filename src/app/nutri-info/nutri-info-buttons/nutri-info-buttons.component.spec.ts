import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriInfoButtonsComponent } from './nutri-info-buttons.component';

describe('NutriInfoButtonsComponent', () => {
  let component: NutriInfoButtonsComponent;
  let fixture: ComponentFixture<NutriInfoButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutriInfoButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutriInfoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
