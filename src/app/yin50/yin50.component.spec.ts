import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Yin50Component } from './yin50.component';

describe('Yin50Component', () => {
  let component: Yin50Component;
  let fixture: ComponentFixture<Yin50Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Yin50Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Yin50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
