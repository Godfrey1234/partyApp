import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogpassComponent } from './fogpass.component';

describe('FogpassComponent', () => {
  let component: FogpassComponent;
  let fixture: ComponentFixture<FogpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
