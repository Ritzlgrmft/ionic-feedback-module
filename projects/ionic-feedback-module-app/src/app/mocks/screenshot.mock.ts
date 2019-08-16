import { Screenshot } from "@ionic-native/screenshot/ngx";
import { environment } from "projects/ionic-feedback-module-app/src/environments/environment";

export class ScreenshotMock extends Screenshot {

	save(format?: string, quality?: number, filename?: string): Promise<any> {
		return Promise.resolve();
	}

	URI(quality?: number): Promise<any> {
		const result = {
			URI: environment.mocks.screenshot.imageUri,
		};
		return Promise.resolve(result);
	}
}
