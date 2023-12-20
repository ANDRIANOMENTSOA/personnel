import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterComponent } from './accepter.component';

describe('AccepterComponent', () => {
  let component: AccepterComponent;
  let fixture: ComponentFixture<AccepterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccepterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccepterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
