import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarinsumoComponent } from './editarinsumo.component';

describe('EditarinsumoComponent', () => {
  let component: EditarinsumoComponent;
  let fixture: ComponentFixture<EditarinsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarinsumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarinsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
