import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RngDiceComponent } from './rng-dice.component';

describe('RngDiceComponent', () => {
  let component: RngDiceComponent;
  let fixture: ComponentFixture<RngDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RngDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RngDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
