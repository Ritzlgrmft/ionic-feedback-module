import { Component, OnInit } from "@angular/core";

import { Device } from "@ionic-native/device/ngx";
import { AlertController, LoadingController, ModalController, NavParams } from "@ionic/angular";

import * as moment_ from "moment";
const moment = moment_;

import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "../app-info.model";
import { AttachmentState } from "../attachment-state.model";
import { FeedbackViewerTranslation } from "../feedback-viewer-translation.model";
import { FeedbackService } from "../feedback.service";

@Component({
	selector: "ionic-feedback-viewer-modal",
	templateUrl: "./feedback-viewer-modal.component.html",
	styleUrls: ["./feedback-viewer-modal.component.css"],
})
export class FeedbackViewerModalComponent implements OnInit {

	public timestamp: string;
	public showCategories: boolean;
	public category: string;
	public categories: string[];
	public message: string;
	public name: string;
	public email: string;
	public showScreenshot: boolean;
	public includeScreenshot: boolean;
	public screenshot: string;
	public showDeviceInfo: boolean;
	public includeDeviceInfo: boolean;
	public deviceInfo: Device;
	public showAppInfo: boolean;
	public includeAppInfo: boolean;
	public appInfo: AppInfo;
	public showLogMessages: boolean;
	public includeLogMessages: boolean;
	public logMessages: LogMessage[];

	public get sendDisabled(): boolean {
		return typeof this.message === "undefined" || this.message.length === 0;
	}

	/**
	 * Language to be used for the modal.
	 * Currently supported: en, de
	 */
	private language: string;

	/**
	 * Translation to be used for the modal.
	 * If specified, the language is ignored.
	 */
	private translation: FeedbackViewerTranslation;

	private logger: Logger;

	private translations: { [language: string]: FeedbackViewerTranslation; };

	constructor(
		navParams: NavParams,
		private alertController: AlertController,
		private loadingController: LoadingController,
		private modalController: ModalController,
		loggingService: LoggingService,
		private feedbackService: FeedbackService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.categories = navParams.get("categories");
		if (Array.isArray(this.categories) && this.categories.length > 0) {
			this.showCategories = true;
			this.category = this.categories[0];
		} else {
			this.showCategories = false;
		}

		this.screenshot = navParams.get("screenshot");
		const attachScreenshot: AttachmentState = navParams.get("attachScreenshot");
		this.includeScreenshot = attachScreenshot === AttachmentState.Yes || attachScreenshot === AttachmentState.Ask;
		this.showScreenshot = attachScreenshot === AttachmentState.Ask;

		this.deviceInfo = navParams.get("deviceInfo");
		const attachDeviceInfo: AttachmentState = navParams.get("attachDeviceInfo");
		this.includeDeviceInfo = attachDeviceInfo === AttachmentState.Yes || attachDeviceInfo === AttachmentState.Ask;
		this.showDeviceInfo = attachDeviceInfo === AttachmentState.Ask;

		this.appInfo = navParams.get("appInfo");
		const attachAppInfo: AttachmentState = navParams.get("attachAppInfo");
		this.includeAppInfo = attachAppInfo === AttachmentState.Yes || attachAppInfo === AttachmentState.Ask;
		this.showAppInfo = attachAppInfo === AttachmentState.Ask;

		this.logMessages = navParams.get("logMessages");
		const attachLogMessages: AttachmentState = navParams.get("attachLogMessages");
		this.includeLogMessages = attachLogMessages === AttachmentState.Yes || attachLogMessages === AttachmentState.Ask;
		this.showLogMessages = attachLogMessages === AttachmentState.Ask;

		this.timestamp = moment().toISOString();
		this.name = navParams.get("name");
		this.email = navParams.get("email");

		this.language = navParams.get("language");
		this.translation = navParams.get("translation");

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the FeedbackViewerModalComponent.
	 * It configures the supported translations.
	 */
	public ngOnInit(): void {
		// prepare translations
		this.translations = {};
		// tslint:disable-next-line:no-string-literal
		this.translations["en"] = {
			// tslint:disable:object-literal-sort-keys
			cancel: "Cancel",
			email: "Email",
			errorSending: "Could not send feedback",
			includeAppInfo: "Include App Info",
			includeDeviceInfo: "Include Device Info",
			includeLogMessages: "Include Log",
			includeScreenshot: "Include Screenshot",
			message: "Message",
			name: "Name",
			ok: "OK",
			send: "Send",
			title: "Feedback",

			manufacturer: "Manufacturer",
			model: "Model",
			uuid: "UUID",
			serial: "Serial",
			platform: "Platform",
			version: "Version",
			cordova: "Cordova",
			isVirtual: "IsVirtual",

			appName: "AppName",
			packageName: "PackageName",
			versionCode: "VersionCode",
			versionNumber: "VersionNumber",
			// tslint:enable:object-literal-sort-keys
		};
		// tslint:disable-next-line:no-string-literal
		this.translations["de"] = {
			// tslint:disable:object-literal-sort-keys
			cancel: "Abbrechen",
			email: "Email",
			errorSending: "Feedback konnte nicht gesendet werden",
			includeAppInfo: "App Info einschließen",
			includeDeviceInfo: "Geräte Info einschließen",
			includeLogMessages: "Log einschließen",
			includeScreenshot: "Screenshot einschließen",
			message: "Nachricht",
			name: "Name",
			ok: "OK",
			send: "Senden",
			title: "Feedback",

			manufacturer: "Hersteller",
			model: "Modell",
			uuid: "UUID",
			serial: "Seriennummer",
			platform: "Plattform",
			version: "Version",
			cordova: "Cordova",
			isVirtual: "Virtuell",

			appName: "Appname",
			packageName: "Packetname",
			versionCode: "Versionscode",
			versionNumber: "Versionsnummer",
			// tslint:enable:object-literal-sort-keys
		};
	}

	/**
	 * Eventhandler called by Ionic when the modal is opened.
	 */
	public ionViewDidEnter(): void {
		const methodName = "ionViewDidEnter";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Eventhandler called when the cancel button is clicked.
	 */
	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.modalController.dismiss();

		this.logger.exit(methodName);
	}

	public async onSend(): Promise<void> {
		const methodName = "onSend";
		this.logger.entry(methodName);

		const loading = await this.loadingController.create();
		try {
			await loading.present();

			await this.feedbackService.sendFeedback(
				this.timestamp,
				this.category,
				this.message,
				this.name,
				this.email,
				this.includeScreenshot ? this.screenshot : undefined,
				this.includeDeviceInfo ? this.deviceInfo : undefined,
				this.includeAppInfo ? this.appInfo : undefined,
				this.includeLogMessages ? this.logMessages : undefined,
			);
			await loading.dismiss();
			this.modalController.dismiss();
		} catch (e) {
			await loading.dismiss();
			const alert = await this.alertController.create({
				buttons: [this.getTranslation().ok],
				header: this.getTranslation().title,
				subHeader: this.getTranslation().errorSending,
			});
			await alert.present();
		}

		this.logger.exit(methodName);
	}

	/**
	 * Helper method returning the current translation:
	 * - the property translation if defined
	 * - the translation according property language if valid
	 * - English translation, otherwise
	 */
	public getTranslation(): FeedbackViewerTranslation {
		if (typeof this.translation !== "undefined") {
			return this.translation;
		} else if (typeof this.language !== "undefined" && typeof this.translations[this.language] === "object") {
			return this.translations[this.language];
		} else {
			// tslint:disable-next-line:no-string-literal
			return this.translations["en"];
		}
	}
}
