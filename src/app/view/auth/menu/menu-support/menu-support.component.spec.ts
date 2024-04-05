import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSupportComponent } from './menu-support.component';

describe('MenuSupportComponent', () => {
  let component: MenuSupportComponent;
  let fixture: ComponentFixture<MenuSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
