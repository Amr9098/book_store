import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbodyComponent } from './fbody.component';

describe('FbodyComponent', () => {
  let component: FbodyComponent;
  let fixture: ComponentFixture<FbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
