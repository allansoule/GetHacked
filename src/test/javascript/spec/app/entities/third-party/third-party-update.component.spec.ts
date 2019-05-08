/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GetHackedTestModule } from '../../../test.module';
import { ThirdPartyUpdateComponent } from 'app/entities/third-party/third-party-update.component';
import { ThirdPartyService } from 'app/entities/third-party/third-party.service';
import { ThirdParty } from 'app/shared/model/third-party.model';

describe('Component Tests', () => {
    describe('ThirdParty Management Update Component', () => {
        let comp: ThirdPartyUpdateComponent;
        let fixture: ComponentFixture<ThirdPartyUpdateComponent>;
        let service: ThirdPartyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [ThirdPartyUpdateComponent]
            })
                .overrideTemplate(ThirdPartyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThirdPartyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdPartyService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ThirdParty(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.thirdParty = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ThirdParty();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.thirdParty = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
