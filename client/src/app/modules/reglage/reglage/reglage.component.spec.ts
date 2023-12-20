import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglageComponent } from './reglage.component';

describe('ReglageComponent', () => {
  let component: ReglageComponent;
  let fixture: ComponentFixture<ReglageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
