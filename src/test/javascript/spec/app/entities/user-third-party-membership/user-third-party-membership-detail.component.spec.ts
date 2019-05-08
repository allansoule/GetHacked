/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GetHackedTestModule } from '../../../test.module';
import { UserThirdPartyMembershipDetailComponent } from 'app/entities/user-third-party-membership/user-third-party-membership-detail.component';
import { UserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

describe('Component Tests', () => {
    describe('UserThirdPartyMembership Management Detail Component', () => {
        let comp: UserThirdPartyMembershipDetailComponent;
        let fixture: ComponentFixture<UserThirdPartyMembershipDetailComponent>;
        const route = ({ data: of({ userThirdPartyMembership: new UserThirdPartyMembership(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [UserThirdPartyMembershipDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserThirdPartyMembershipDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserThirdPartyMembershipDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userThirdPartyMembership).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
