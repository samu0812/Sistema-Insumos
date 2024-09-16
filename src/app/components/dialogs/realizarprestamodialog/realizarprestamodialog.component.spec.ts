import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarprestamodialogComponent } from './realizarprestamodialog.component';

describe('RealizarprestamodialogComponent', () => {
  let component: RealizarprestamodialogComponent;
  let fixture: ComponentFixture<RealizarprestamodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizarprestamodialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarprestamodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
