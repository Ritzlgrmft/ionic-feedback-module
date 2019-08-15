import { Component } from "@angular/core";

import { ModalController } from "@ionic/angular";

import { FeedbackViewerModalService } from "ionic-feedback-module";
import { Logger, LoggingService } from "ionic-logging-service";
import { SettingsModalComponent } from "../settings/settings-modal.component";
import { environment } from "src/environments/environment.cordova";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {

	public message: string;

	private logger: Logger;

	constructor(
		private modalController: ModalController,
		loggingService: LoggingService,
		private feedbackViewerModalService: FeedbackViewerModalService,
	) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Module.App.HomePage");
		const methodName = "ctor";
		this.logger.entry(methodName);

		if (environment.mocks.useMocks) {
			this.message = "Rotate to simulate shaking";
		} else {
			this.message = "Shake me to send feedback";
		}

		this.logger.exit(methodName);
	}

	/**
	 * Open feedback modal.
	 */
	public async openFeedback(): Promise<void> {
		const methodName = "openFeedback";
		this.logger.entry(methodName);

		await this.feedbackViewerModalService.openModal();

		this.logger.exit(methodName);
	}

	/**
	 * Open settings modal.
	 */
	public async openSettings(): Promise<void> {
		const methodName = "openSettings";
		this.logger.entry(methodName);

		const modal = await this.modalController.create({
			component: SettingsModalComponent,
		});
		await modal.present();

		this.logger.exit(methodName);
	}
}
