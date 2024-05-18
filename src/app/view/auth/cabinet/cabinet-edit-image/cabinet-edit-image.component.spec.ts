import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CabinetEditImageComponent} from './cabinet-edit-image.component';

describe('CabinetEditImageComponent', () => {
    let component: CabinetEditImageComponent;
    let fixture: ComponentFixture<CabinetEditImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CabinetEditImageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CabinetEditImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
