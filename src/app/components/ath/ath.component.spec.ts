import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthComponent } from './ath.component';

describe('AthComponent', () => {
  let component: AthComponent;
  let fixture: ComponentFixture<AthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
