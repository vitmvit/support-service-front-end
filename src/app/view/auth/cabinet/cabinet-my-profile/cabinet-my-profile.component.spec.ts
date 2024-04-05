import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetMyProfileComponent } from './cabinet-my-profile.component';

describe('CabinetMyProfileComponent', () => {
  let component: CabinetMyProfileComponent;
  let fixture: ComponentFixture<CabinetMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetMyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinetMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
