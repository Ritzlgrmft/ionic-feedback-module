export const environment = {
	production: false,

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
		url: "http://localhost:5000/api/Feedback",
		language: "en",
		categories: [
			"Issue",
			"Suggestion",
		],
		attachScreenshot: "Ask",
		attachDeviceInfo: "Ask",
		attachAppInfo: "Ask",
		attachLogMessages: "Ask",
	},
	mocks: {
		appVersion: {
			appName: "Ionic Feedback Module App",
			packageName: "Ionic.Feedback.Module.App",
			versionCode: 10203,
			versionNumber: "1.2.3",
		},
	},
};

import "zone.js/dist/zone-error";  // Included with Angular CLI.
