import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetPageChatComponent } from './cabinet-page-chat.component';

describe('CabinetPageChatComponent', () => {
  let component: CabinetPageChatComponent;
  let fixture: ComponentFixture<CabinetPageChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetPageChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinetPageChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
