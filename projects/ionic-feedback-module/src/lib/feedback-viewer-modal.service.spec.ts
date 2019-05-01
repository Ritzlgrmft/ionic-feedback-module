import { TestBed } from "@angular/core/testing";

import { FeedbackViewerModalService } from "./feedback-viewer-modal.service";

describe("FeedbackViewerModalService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: FeedbackViewerModalService = TestBed.get(FeedbackViewerModalService);
		expect(service).toBeTruthy();
	});
});
