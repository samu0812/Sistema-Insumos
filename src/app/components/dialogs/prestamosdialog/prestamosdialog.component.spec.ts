import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosdialogComponent } from './prestamosdialog.component';

describe('PrestamosdialogComponent', () => {
  let component: PrestamosdialogComponent;
  let fixture: ComponentFixture<PrestamosdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestamosdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
