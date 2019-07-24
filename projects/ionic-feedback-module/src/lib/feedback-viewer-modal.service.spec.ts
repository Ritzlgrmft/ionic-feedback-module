import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { IonicModule } from "@ionic/angular";

import { AppVersion } from "@ionic-native/app-version/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { Shake } from "@ionic-native/shake/ngx";

import { FeedbackViewerModalService } from "./feedback-viewer-modal.service";

describe("FeedbackViewerModalService", () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			IonicModule.forRoot(),
		],
		providers: [
			AppVersion,
			Device,
			HttpClient,
			HttpHandler,
			Screenshot,
			Shake,
		]
	}));

	it("should be created", () => {
		const service: FeedbackViewerModalService = TestBed.get(FeedbackViewerModalService);
		expect(service).toBeTruthy();
	});
});
