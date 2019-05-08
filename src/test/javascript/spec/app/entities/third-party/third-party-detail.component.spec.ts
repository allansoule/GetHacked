/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GetHackedTestModule } from '../../../test.module';
import { ThirdPartyDetailComponent } from 'app/entities/third-party/third-party-detail.component';
import { ThirdParty } from 'app/shared/model/third-party.model';

describe('Component Tests', () => {
    describe('ThirdParty Management Detail Component', () => {
        let comp: ThirdPartyDetailComponent;
        let fixture: ComponentFixture<ThirdPartyDetailComponent>;
        const route = ({ data: of({ thirdParty: new ThirdParty(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [ThirdPartyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThirdPartyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThirdPartyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thirdParty).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
