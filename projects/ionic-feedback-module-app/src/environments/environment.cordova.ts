import { AttachmentState } from "ionic-feedback-module";
import { Environment } from "./environment.model";

export const environment: Environment = {
	production: true,

	logging: {
		logLevels: [
			{
				loggerName: "root",
				logLevel: "DEBUG",
			},
		],
	},
	feedback: {
		isEnabled: true,
		appKey: "94f4e317-a8ef-4ece-92ff-9e0d9398b5eb",
		appSecret: "307726c0-f677-4918-beb5-01ca6fce80ea",
		url: "https://ionic-feedback-backend.azurewebsites.net/api/Feedback",
		language: "en",
		categories: [
			"Issue",
			"Suggestion",
		],
		attachScreenshot: AttachmentState.Ask,
		attachDeviceInfo: AttachmentState.Ask,
		attachAppInfo: AttachmentState.Ask,
		attachLogMessages: AttachmentState.Ask,
	},
	mocks: {
		useMocks: false,
	}
};

import "zone.js/dist/zone-error";  // Included with Angular CLI.
