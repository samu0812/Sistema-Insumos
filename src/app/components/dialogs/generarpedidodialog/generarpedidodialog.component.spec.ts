import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarpedidodialogComponent } from './generarpedidodialog.component';

describe('GenerarpedidodialogComponent', () => {
  let component: GenerarpedidodialogComponent;
  let fixture: ComponentFixture<GenerarpedidodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerarpedidodialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarpedidodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
