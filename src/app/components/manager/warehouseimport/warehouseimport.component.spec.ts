import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseimportComponent } from './warehouseimport.component';

describe('WarehouseimportComponent', () => {
  let component: WarehouseimportComponent;
  let fixture: ComponentFixture<WarehouseimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseimportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
