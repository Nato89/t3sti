import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroPensamientoComponent } from './centro-pensamiento.component';

describe('CentroPensamientoComponent', () => {
  let component: CentroPensamientoComponent;
  let fixture: ComponentFixture<CentroPensamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroPensamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroPensamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
