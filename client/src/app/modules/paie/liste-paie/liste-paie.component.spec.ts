import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaieComponent } from './liste-paie.component';

describe('ListePaieComponent', () => {
  let component: ListePaieComponent;
  let fixture: ComponentFixture<ListePaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePaieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
