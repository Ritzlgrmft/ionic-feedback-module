import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";

import { FeedbackService, FeedbackViewerModalService } from "ionic-feedback-module";
import { Logger, LoggingService } from "ionic-logging-service";

import { environment } from "projects/ionic-feedback-module-app/src/environments/environment";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {

	private logger: Logger;

	constructor(
		platform: Platform,
		loggingService: LoggingService,
		feedbackService: FeedbackService,
		private feedbackViewerModalService: FeedbackViewerModalService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Module.App");
		const methodName = "ctor";
		this.logger.entry(methodName);

		platform.ready().then(() => {
			feedbackService.configure(environment.feedback);
			feedbackService.shaken.subscribe(() => {
				this.onShaken();
			});
			feedbackService.startWatchForShake();
		});

		this.logger.exit(methodName);
	}

	private async onShaken(): Promise<void> {
		const methodName = "onShaken";
		this.logger.entry(methodName);

		try {
			await this.feedbackViewerModalService.openModal();
		} catch (e) {
			this.logger.error(methodName, e);
		}

		this.logger.exit(methodName);
	}
}
