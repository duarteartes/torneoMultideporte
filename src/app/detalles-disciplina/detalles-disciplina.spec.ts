import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDisciplina } from './detalles-disciplina';

describe('DetallesDisciplina', () => {
  let component: DetallesDisciplina;
  let fixture: ComponentFixture<DetallesDisciplina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesDisciplina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesDisciplina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
