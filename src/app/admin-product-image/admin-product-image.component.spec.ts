import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductImageComponent } from './admin-product-image.component';

describe('AdminProductImageComponent', () => {
  let component: AdminProductImageComponent;
  let fixture: ComponentFixture<AdminProductImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductImageComponent]
    });
    fixture = TestBed.createComponent(AdminProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
