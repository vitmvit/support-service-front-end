import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetEditDirectoryComponent } from './cabinet-edit-directory.component';

describe('CabinetEditDirectoryComponent', () => {
  let component: CabinetEditDirectoryComponent;
  let fixture: ComponentFixture<CabinetEditDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetEditDirectoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabinetEditDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
