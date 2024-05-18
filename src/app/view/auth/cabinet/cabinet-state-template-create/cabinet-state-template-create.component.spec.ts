import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CabinetStateTemplateCreateComponent} from './cabinet-state-template-create.component';

describe('CabinetStateTemplateCreateComponent', () => {
    let component: CabinetStateTemplateCreateComponent;
    let fixture: ComponentFixture<CabinetStateTemplateCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CabinetStateTemplateCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CabinetStateTemplateCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
