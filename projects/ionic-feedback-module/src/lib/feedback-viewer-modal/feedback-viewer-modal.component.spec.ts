import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeedbackViewerModalComponent } from "./feedback-viewer-modal.component";

describe("FeedbackViewerModalComponent", () => {
	let component: FeedbackViewerModalComponent;
	let fixture: ComponentFixture<FeedbackViewerModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeedbackViewerModalComponent],
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
