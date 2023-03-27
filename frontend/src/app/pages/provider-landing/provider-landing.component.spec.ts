import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLandingComponent } from './provider-landing.component';

describe('ProviderLandingComponent', () => {
  let component: ProviderLandingComponent;
  let fixture: ComponentFixture<ProviderLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
