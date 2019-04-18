/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GetHackedTestModule } from '../../../test.module';
import { ThirdPartyComponent } from 'app/entities/third-party/third-party.component';
import { ThirdPartyService } from 'app/entities/third-party/third-party.service';
import { ThirdParty } from 'app/shared/model/third-party.model';

describe('Component Tests', () => {
    describe('ThirdParty Management Component', () => {
        let comp: ThirdPartyComponent;
        let fixture: ComponentFixture<ThirdPartyComponent>;
        let service: ThirdPartyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [ThirdPartyComponent],
                providers: []
            })
                .overrideTemplate(ThirdPartyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThirdPartyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdPartyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThirdParty(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thirdParties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
