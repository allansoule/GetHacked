/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GetHackedTestModule } from '../../../test.module';
import { UserThirdPartyMembershipUpdateComponent } from 'app/entities/user-third-party-membership/user-third-party-membership-update.component';
import { UserThirdPartyMembershipService } from 'app/entities/user-third-party-membership/user-third-party-membership.service';
import { UserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

describe('Component Tests', () => {
    describe('UserThirdPartyMembership Management Update Component', () => {
        let comp: UserThirdPartyMembershipUpdateComponent;
        let fixture: ComponentFixture<UserThirdPartyMembershipUpdateComponent>;
        let service: UserThirdPartyMembershipService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [UserThirdPartyMembershipUpdateComponent]
            })
                .overrideTemplate(UserThirdPartyMembershipUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserThirdPartyMembershipUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserThirdPartyMembershipService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new UserThirdPartyMembership(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.userThirdPartyMembership = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new UserThirdPartyMembership();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.userThirdPartyMembership = entity;
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
