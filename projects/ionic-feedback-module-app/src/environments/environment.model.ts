import { LoggingServiceConfiguration } from "ionic-logging-service";
import { FeedbackConfiguration } from "ionic-feedback-module";

export interface Environment {
	production: boolean;
	logging: LoggingServiceConfiguration;
	feedback: FeedbackConfiguration;
	mocks: {
		useMocks: boolean;
		appVersion?: {
			appName: string;
			packageName: string;
			versionCode: number;
			versionNumber: string;
		},
		device?: {
			cordova: string;
			model: string;
			platform: string;
			uuid: string;
			version: string;
			manufacturer: string;
			isVirtual: boolean;
			serial: string;
		},
		screenshot?: {
			imageUri: string;
		}
	};
}
