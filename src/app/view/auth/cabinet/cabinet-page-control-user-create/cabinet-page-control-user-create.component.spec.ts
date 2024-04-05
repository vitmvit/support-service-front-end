import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabinetPageControlUserCreateComponent } from './cabinet-page-control-user-create.component';



describe('CabinetPageControlUserComponent', () => {
  let component: CabinetPageControlUserCreateComponent;
  let fixture: ComponentFixture<CabinetPageControlUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinetPageControlUserCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetPageControlUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
