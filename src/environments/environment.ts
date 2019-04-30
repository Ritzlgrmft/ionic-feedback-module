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
};

import "zone.js/dist/zone-error";  // Included with Angular CLI.
