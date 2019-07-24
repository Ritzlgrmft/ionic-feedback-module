import { Device } from "@ionic-native/device/ngx";

import { environment } from "src/environments/environment";

export class DeviceMock extends Device {
	get cordova(): string {
		return environment.mocks.device.cordova;
	}
	get model(): string {
		return environment.mocks.device.model;
	}
	get platform(): string {
		return environment.mocks.device.platform;
	}
	get uuid(): string {
		return environment.mocks.device.uuid;
	}
	get version(): string {
		return environment.mocks.device.version;
	}
	get manufacturer(): string {
		return environment.mocks.device.manufacturer;
	}
	get isVirtual(): boolean {
		return environment.mocks.device.isVirtual;
	}
	get serial(): string {
		return environment.mocks.device.serial;
	}
}
