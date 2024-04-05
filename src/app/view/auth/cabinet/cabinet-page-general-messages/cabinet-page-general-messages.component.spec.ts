import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPageGeneralMessagesComponent } from './cabinet-page-general-messages.component';

describe('CabinetPageGeneralMessagesComponent', () => {
  let component: CabinetPageGeneralMessagesComponent;
  let fixture: ComponentFixture<CabinetPageGeneralMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetPageGeneralMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinetPageGeneralMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
