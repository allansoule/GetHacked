/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GetHackedTestModule } from '../../../test.module';
import { UserThirdPartyMembershipComponent } from 'app/entities/user-third-party-membership/user-third-party-membership.component';
import { UserThirdPartyMembershipService } from 'app/entities/user-third-party-membership/user-third-party-membership.service';
import { UserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

describe('Component Tests', () => {
    describe('UserThirdPartyMembership Management Component', () => {
        let comp: UserThirdPartyMembershipComponent;
        let fixture: ComponentFixture<UserThirdPartyMembershipComponent>;
        let service: UserThirdPartyMembershipService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [UserThirdPartyMembershipComponent],
                providers: []
            })
                .overrideTemplate(UserThirdPartyMembershipComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserThirdPartyMembershipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserThirdPartyMembershipService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserThirdPartyMembership(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userThirdPartyMemberships[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
