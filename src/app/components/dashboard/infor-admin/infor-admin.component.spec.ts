import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforAdminComponent } from './infor-admin.component';

describe('InforAdminComponent', () => {
  let component: InforAdminComponent;
  let fixture: ComponentFixture<InforAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InforAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InforAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
