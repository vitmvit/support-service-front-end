import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CabinetPageControlUserDeleteComponent} from './cabinet-page-control-user-delete.component';

describe('CabinetPageControlUserDeleteComponent', () => {
    let component: CabinetPageControlUserDeleteComponent;
    let fixture: ComponentFixture<CabinetPageControlUserDeleteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CabinetPageControlUserDeleteComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CabinetPageControlUserDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
