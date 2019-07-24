import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";

import { IonicModule, NavParams } from "@ionic/angular";

import { FeedbackViewerModalComponent } from "./feedback-viewer-modal.component";

describe("FeedbackViewerModalComponent", () => {
	let component: FeedbackViewerModalComponent;
	let fixture: ComponentFixture<FeedbackViewerModalComponent>;

	const navParamsStub = jasmine.createSpyObj("navParams", ["get"]);
	navParamsStub.get.and.returnValue(undefined);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				FeedbackViewerModalComponent
			],
			imports: [
				FormsModule,
				IonicModule.forRoot(),
			],
			providers: [
				{ provide: NavParams, useValue: navParamsStub },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedbackViewerModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
