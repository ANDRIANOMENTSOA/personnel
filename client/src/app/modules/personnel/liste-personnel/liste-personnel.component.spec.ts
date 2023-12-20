import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePersonnelComponent } from './liste-personnel.component';

describe('ListePersonnelComponent', () => {
  let component: ListePersonnelComponent;
  let fixture: ComponentFixture<ListePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
