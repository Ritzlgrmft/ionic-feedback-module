import { EventEmitter, Injectable } from "@angular/core";

import { AppVersion } from "@ionic-native/app-version/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { ModalController } from "@ionic/angular";

import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "./app-info.model";
import { AttachmentState } from "./attachment-state.model";
import { FeedbackViewerModalComponent } from "./feedback-viewer-modal/feedback-viewer-modal.component";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";
import { FeedbackService } from "./feedback.service";

@Injectable({
	providedIn: "root",
})
export class FeedbackViewerModalService {

	/**
	 * Event submitted when the modal gets closed.
	 */
	public modalClosed = new EventEmitter<void>();

	private logger: Logger;

	private modalIsOpen: boolean;

	constructor(
		private modalController: ModalController,
		private appVersion: AppVersion,
		private device: Device,
		private screenshot: Screenshot,
		private loggingService: LoggingService,
		private feedbackService: FeedbackService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Service");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.modalIsOpen = false;

		this.logger.exit(methodName);
	}

	/**
	 * Opens the modal.
	 * @param language language used for the modal. Currently the languages en and de are supported.
	 *                 If the given language is unknown or undefined, the given translation is used.
	 * @param translation translation for the labels in the modal.
	 * @param categories optional categories of the feedback.
	 * @param name name of the contact.
	 * @param email email address.
	 * @param attachScreenshot if true, a shot of the current screen will be attached.
	 * @param attachLogMessages shall the last log messages be attached.
	 * @param attachDeviceInfo if true, the device info will be attached.
	 * @param attachAppInfo if true, the app info will be attached.
	 * @returns Promise which gets resolved as soon as the modal is shown.
	 */
	public async openModal(
		language?: string,
		translation?: FeedbackViewerTranslation,
		categories?: string[],
		name?: string | undefined,
		email?: string | undefined,
		attachScreenshot?: AttachmentState | string,
		attachDeviceInfo?: AttachmentState | string,
		attachAppInfo?: AttachmentState | string,
		attachLogMessages?: AttachmentState | string,
	): Promise<void> {

		// check for default values
		const configuration = this.feedbackService.configuration;
		const contact = this.feedbackService.contact;
		if (!language) {
			language = configuration.language;
		}
		if (!translation) {
			translation = configuration.translation;
		}
		if (!categories) {
			categories = configuration.categories;
		}
		if (!name) {
			name = contact.name;
		}
		if (!email) {
			email = contact.email;
		}
		if (!attachScreenshot) {
			attachScreenshot = configuration.attachScreenshot;
		}
		if (!attachDeviceInfo) {
			attachDeviceInfo = configuration.attachDeviceInfo;
		}
		if (!attachAppInfo) {
			attachAppInfo = configuration.attachAppInfo;
		}
		if (!attachLogMessages) {
			attachLogMessages = configuration.attachLogMessages;
		}

		// retrieve log messages (as soon as possible)
		let logMessages: LogMessage[] | undefined;
		if (attachLogMessages === AttachmentState.Ask || attachLogMessages === AttachmentState.Yes) {
			// thanks to slice(), the array is cloned
			logMessages = this.loggingService.getLogMessages().slice(0);
		}

		const methodName = "openModal";
		this.logger.entry(methodName, language, typeof translation === "object" ? "object" : undefined, categories,
			name, email, attachScreenshot, attachDeviceInfo, attachAppInfo, attachLogMessages);

		if (this.modalIsOpen) {
			this.logger.warn(methodName, "modal is already open");
			throw new Error("FeedbackViewerModalComponent is already open");
		}

		try {
			this.modalIsOpen = true;

			// take screenshot
			let screenshot: string | undefined;
			if (attachScreenshot === AttachmentState.Ask || attachScreenshot === AttachmentState.Yes) {
				try {
					screenshot = (await this.screenshot.URI()).URI;
					this.logger.debug(methodName, "screenshot taken");
				} catch (e) {
					this.logger.error(methodName, "could not take screenshot", e);
					attachScreenshot = AttachmentState.No;
				}
			}

			// retrieve device info
			let deviceInfo: Device | undefined;
			if (attachDeviceInfo === AttachmentState.Ask || attachDeviceInfo === AttachmentState.Yes) {
				try {
					deviceInfo = {
						cordova: this.device.cordova,
						isVirtual: this.device.isVirtual,
						manufacturer: this.device.manufacturer,
						model: this.device.model,
						platform: this.device.platform,
						serial: this.device.serial,
						uuid: this.device.uuid,
						version: this.device.version,
					};
				} catch (e) {
					this.logger.debug(methodName, "no device info available", e);
					attachDeviceInfo = AttachmentState.No;
				}
			}

			// retrieve app info
			let appInfo: AppInfo | undefined;
			if (attachAppInfo === AttachmentState.Ask || attachAppInfo === AttachmentState.Yes) {
				try {
					appInfo = {
						appName: await this.appVersion.getAppName(),
						packageName: await this.appVersion.getPackageName(),
						versionCode: (await this.appVersion.getVersionCode()).toString(),
						versionNumber: await this.appVersion.getVersionNumber(),
					};
				} catch (e) {
					this.logger.debug(methodName, "no app info available", e);
					attachAppInfo = AttachmentState.No;
				}
			}

			const modal = await this.modalController.create({
				component: FeedbackViewerModalComponent,
				componentProps: {
					// tslint:disable:object-literal-sort-keys
					categories,
					name,
					email,
					attachLogMessages,
					logMessages,
					attachDeviceInfo,
					deviceInfo,
					attachAppInfo,
					appInfo,
					attachScreenshot,
					screenshot,
					language,
					translation,
					// tslint:enable:object-literal-sort-keys
				},
			});
			modal.onDidDismiss().then(() => {
				this.onModalClosed();
			});
			await modal.present();
		} catch (e) {
			this.logger.error(methodName, e);
			// something went wrong, so the modal is not open
			this.modalIsOpen = false;
			throw e;
		}

		this.logger.exit(methodName);
	}

	/**
	 * Callback called when the modal is closed.
	 */
	private onModalClosed(): void {
		const methodName = "onModalClosed";
		this.logger.entry(methodName);

		this.modalIsOpen = false;
		this.modalClosed.emit();

		this.logger.exit(methodName);
	}
}
