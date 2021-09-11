import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseexportComponent } from './warehouseexport.component';

describe('WarehouseexportComponent', () => {
  let component: WarehouseexportComponent;
  let fixture: ComponentFixture<WarehouseexportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseexportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
