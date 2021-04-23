import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichlineComponent } from './richline.component';

describe('RichlineComponent', () => {
  let component: RichlineComponent;
  let fixture: ComponentFixture<RichlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
