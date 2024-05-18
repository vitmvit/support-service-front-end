import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CabinetPageMessagesComponent} from './cabinet-page-messages.component';

describe('CabinetPageMessagesComponent', () => {
    let component: CabinetPageMessagesComponent;
    let fixture: ComponentFixture<CabinetPageMessagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CabinetPageMessagesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CabinetPageMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
