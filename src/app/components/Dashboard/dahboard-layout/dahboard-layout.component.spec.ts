import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahboardLayoutComponent } from './dahboard-layout.component';

describe('DahboardLayoutComponent', () => {
  let component: DahboardLayoutComponent;
  let fixture: ComponentFixture<DahboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DahboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DahboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
