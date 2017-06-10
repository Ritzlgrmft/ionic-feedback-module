import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import { Device } from "@ionic-native/device";
import { Shake } from "@ionic-native/shake";
import { Platform } from "ionic-angular";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "./app-info.model";
import { AttachmentState } from "./attachment-state.model";
import { FeedbackConfiguration } from "./feedback-configuration.model";
import { FeedbackContact } from "./feedback-contact.model";

@Injectable()
export class FeedbackService {

	public shaken: EventEmitter<void>;
	public configuration: FeedbackConfiguration;
	public contact: FeedbackContact;

	private logger: Logger;

	constructor(
		private http: Http,
		private platform: Platform,
		private shake: Shake,
		private configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Service");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configure();
		this.shaken = new EventEmitter<void>();

		this.logger.exit(methodName);
	}

	public async startWatchForShake(): Promise<void> {
		const methodName = "startWatchForShake";
		this.logger.entry(methodName);

		if (!this.configuration.isEnabled) {
			this.logger.warn(methodName, "feedback is disabled");
		} else if (await this.platform.ready() === "cordova") {
			this.shake.startWatch().subscribe(() => this.onShaken());
			this.logger.debug(methodName, "subscribed for shake events");
		} else {
			this.logger.warn(methodName, "shaking is not supported");
		}

		this.logger.exit(methodName);
	}

	public async sendFeedback(
		timestamp: string, category: string, message: string, name: string,
		email: string, screenshot: string | undefined, deviceInfo: Device | undefined, appInfo: AppInfo | undefined,
		logMessages: LogMessage[] | undefined): Promise<void> {

		const methodName = "sendFeedback";
		this.logger.entry(methodName);

		const headers = new Headers();
		headers.append("Accept", "application/json");
		headers.append("Authorization",
			"Basic " + btoa("94f4e317-a8ef-4ece-92ff-9e0d9398b5eb" + ":" + "307726c0-f677-4918-beb5-01ca6fce80ea"));
		headers.append("Content-Type", "application/json");
		const body = {
			appInfo,
			category,
			deviceInfo,
			email,
			logMessages,
			message,
			name,
			screenshot,
			timestamp,
		};

		try {
			this.logger.debug(methodName, `before POST ${this.configuration.url}`, body);
			await this.http.post(this.configuration.url, JSON.stringify(body),
				{ headers, withCredentials: true }).toPromise();
			this.logger.debug(methodName, `after POST ${this.configuration.url}`);
		} catch (e) {
			this.logger.error(methodName, e);
			throw e;
		}

		this.logger.exit(methodName);
	}

	private configure(configuration?: FeedbackConfiguration): void {
		const methodName = "configure";
		this.logger.entry(methodName, configuration);

		if (typeof configuration === "undefined") {
			configuration = this.configurationService.getValue<FeedbackConfiguration>("feedback");
		}
		if (typeof configuration === "undefined") {
			this.logger.error(methodName, "configuration missing");
			throw new Error("FeedbackService: configuation missing");
		}

		// map enum values
		if (typeof configuration.attachLogMessages === "string") {
			configuration.attachLogMessages = AttachmentState[configuration.attachLogMessages as any] as any as AttachmentState;
		}
		if (typeof configuration.attachDeviceInfo === "string") {
			configuration.attachDeviceInfo = AttachmentState[configuration.attachDeviceInfo as any] as any as AttachmentState;
		}
		if (typeof configuration.attachAppInfo === "string") {
			configuration.attachAppInfo = AttachmentState[configuration.attachAppInfo as any] as any as AttachmentState;
		}
		if (typeof configuration.attachScreenshot === "string") {
			configuration.attachScreenshot = AttachmentState[configuration.attachScreenshot as any] as any as AttachmentState;
		}

		this.configuration = configuration;
		this.contact = {};

		this.logger.exit(methodName);
	}

	private async onShaken(): Promise<void> {
		const methodName = "onShaken";
		this.logger.entry(methodName);

		this.shaken.emit();

		this.logger.exit(methodName);
	}
}
