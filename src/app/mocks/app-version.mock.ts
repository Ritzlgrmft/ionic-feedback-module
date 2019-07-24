import { AppVersion } from "@ionic-native/app-version/ngx";

import { environment } from "src/environments/environment";

export class AppVersionMock extends AppVersion {

	getAppName(): Promise<string> {
		return Promise.resolve(environment.mocks.appVersion.appName);
	}

	getPackageName(): Promise<string> {
		return Promise.resolve(environment.mocks.appVersion.packageName);
	}

	getVersionCode(): Promise<string | number> {
		return Promise.resolve(environment.mocks.appVersion.versionCode);
	}

	getVersionNumber(): Promise<string> {
		return Promise.resolve(environment.mocks.appVersion.versionNumber);
	}
}
