/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GetHackedTestModule } from '../../../test.module';
import { ThirdPartyDeleteDialogComponent } from 'app/entities/third-party/third-party-delete-dialog.component';
import { ThirdPartyService } from 'app/entities/third-party/third-party.service';

describe('Component Tests', () => {
    describe('ThirdParty Management Delete Component', () => {
        let comp: ThirdPartyDeleteDialogComponent;
        let fixture: ComponentFixture<ThirdPartyDeleteDialogComponent>;
        let service: ThirdPartyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GetHackedTestModule],
                declarations: [ThirdPartyDeleteDialogComponent]
            })
                .overrideTemplate(ThirdPartyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThirdPartyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdPartyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
