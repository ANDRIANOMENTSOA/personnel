import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSignatureComponent } from './ng-signature.component';

describe('NgSignatureComponent', () => {
  let component: NgSignatureComponent;
  let fixture: ComponentFixture<NgSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSignatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
