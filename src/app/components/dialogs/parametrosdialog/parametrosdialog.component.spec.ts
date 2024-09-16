import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosdialogComponent } from './parametrosdialog.component';

describe('ParametrosdialogComponent', () => {
  let component: ParametrosdialogComponent;
  let fixture: ComponentFixture<ParametrosdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrosdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrosdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
