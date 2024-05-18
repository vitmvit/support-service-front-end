import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageStateTemplateComponent} from './image-state-template.component';

describe('ImageStateTemplateComponent', () => {
    let component: ImageStateTemplateComponent;
    let fixture: ComponentFixture<ImageStateTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageStateTemplateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageStateTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
