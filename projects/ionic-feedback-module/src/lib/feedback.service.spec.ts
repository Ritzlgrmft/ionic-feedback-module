import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { Shake } from "@ionic-native/shake/ngx";

import { FeedbackService } from "./feedback.service";

describe("FeedbackService", () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			HttpClient,
			HttpHandler,
			Shake,
		]
	}));

	it("should be created", () => {
		const service: FeedbackService = TestBed.get(FeedbackService);
		expect(service).toBeTruthy();
	});
});
