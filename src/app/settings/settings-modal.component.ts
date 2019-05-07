import { Component, OnInit } from "@angular/core";
// import { ItemSliding, NavController, reorderArray, ViewController } from "ionic-angular";
// import { ReorderIndexes } from "ionic-angular/components/item/item-reorder";

import { ModalController, NavController, Platform } from "@ionic/angular";
import { ViewController } from "@ionic/core";

import { Logger, LoggingService } from "ionic-logging-service";

import { AttachmentState, FeedbackConfiguration } from "ionic-feedback-module";
import { FeedbackService } from "ionic-feedback-module";
import { FeedbackContact } from "ionic-feedback-module";
import { FeedbackViewerTranslation } from "ionic-feedback-module";

// tslint:disable-next-line:max-line-length
// import { AttachmentState, FeedbackConfiguration, FeedbackContact, FeedbackService, FeedbackViewerTranslation } from "ionic-feedback-module";

/**
 * Settings modal.
 */
@Component({
	selector: "app-settings-modal",
	templateUrl: "./settings-modal.component.html",
	styleUrls: ["./settings-modal.component.css"],
})
export class SettingsModalComponent implements OnInit {

	/**
	 * Available languages for FeedbackViewerModalManager.
	 */
	public languages: string[];

	/**
	 * Selected language.
	 */
	public selectedLanguage: string;

	/**
	 * Custom translation, used if selectedLanguage === "custom"
	 */
	public translation: FeedbackViewerTranslation;

	public categories: string[];

	public name: string | undefined;
	public email: string | undefined;

	public attachmentStates: Array<{ value: number, text: string }>;
	public attachScreenshot: AttachmentState;
	public attachDeviceInfo: AttachmentState;
	public attachAppInfo: AttachmentState;
	public attachLogMessages: AttachmentState;

	/**
	 * Flag controlling which close button will be shown.
	 */
	public isAndroid: boolean;

	private logger: Logger;
	private configuration: FeedbackConfiguration;
	private contact: FeedbackContact;

	constructor(
		private modalController: ModalController,
		private platform: Platform,
		loggingService: LoggingService,
		private feedbackService: FeedbackService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Module.App.SettingsModal");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.attachmentStates = Object.keys(AttachmentState)
			.map((value) => parseInt(value, 10))
			.filter((value) => !isNaN(value))
			.map((value) => ({ value, text: AttachmentState[value] as string }));

		this.configuration = feedbackService.configuration;
		this.contact = feedbackService.contact;

		this.isAndroid = platform.is("android");

		this.logger.exit(methodName);
	}

	public ngOnInit(): void {
		this.languages = ["en", "de", "custom"];

		this.selectedLanguage = this.configuration.language;
		if (this.selectedLanguage === "custom") {
			this.translation = this.configuration.translation;
		} else {
			this.translation = {
				// tslint:disable:object-literal-sort-keys
				cancel: "myCancel",
				email: "myEmail",
				errorSending: "myErrorSending",
				includeAppInfo: "myIncludeAppInfo",
				includeDeviceInfo: "myIncludeDeviceInfo",
				includeLogMessages: "myIncludeLogMessages",
				includeScreenshot: "myIncludeScreenshot",
				message: "myMessage",
				name: "myName",
				ok: "myOk",
				send: "mySend",
				title: "myTitle",

				manufacturer: "myManufacturer",
				model: "myModel",
				uuid: "myUUID",
				serial: "mySerial",
				platform: "myPlatform",
				version: "myVersion",
				cordova: "myCordova",
				isVirtual: "myIsVirtual",

				appName: "myAppName",
				packageName: "myPacketName",
				versionCode: "myVersionCode",
				versionNumber: "myVersionNumber",
				// tslint:enable:object-literal-sort-keys
			};
		}
		this.categories = this.configuration.categories;
		this.name = this.contact.name;
		this.email = this.contact.email;
		this.attachScreenshot = this.configuration.attachScreenshot;
		this.attachDeviceInfo = this.configuration.attachDeviceInfo;
		this.attachAppInfo = this.configuration.attachAppInfo;
		this.attachLogMessages = this.configuration.attachLogMessages;
	}

	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.modalController.dismiss();

		this.logger.exit(methodName);
	}

	public async onSave(): Promise<void> {
		const methodName = "onSave";
		this.logger.entry(methodName);

		this.configuration.language = this.selectedLanguage;
		if (this.selectedLanguage === "custom") {
			this.configuration.translation = this.translation;
		}
		this.configuration.categories = this.categories;
		this.contact.name = this.name;
		this.contact.email = this.email;
		this.configuration.attachScreenshot = this.attachScreenshot;
		this.configuration.attachDeviceInfo = this.attachDeviceInfo;
		this.configuration.attachAppInfo = this.attachAppInfo;
		this.configuration.attachLogMessages = this.attachLogMessages;

		await this.modalController.dismiss();

		this.logger.exit(methodName);
	}

	/**
	 * Change the language for the feedback modal.
	 */
	public changeLanguage(language: string): void {
		this.selectedLanguage = language;
	}

	public deleteCategory(categoryToDelete: string): void {
		for (let i = 0; i < this.categories.length; i++) {
			if (this.categories[i] === categoryToDelete.toString()) {
				this.categories.splice(i, 1);
				break;
			}
		}
	}

	public addCategory(): void {
		this.categories.push(`Category ${this.categories.length + 1}`);
	}
}
