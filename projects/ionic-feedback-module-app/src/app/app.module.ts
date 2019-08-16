import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { AppVersion } from "@ionic-native/app-version/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { Shake } from "@ionic-native/shake/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { FeedbackModule } from "ionic-feedback-module";
import { LoggingService, LoggingServiceModule } from "ionic-logging-service";

import { environment } from "projects/ionic-feedback-module-app/src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppVersionMock } from "./mocks/app-version.mock";
import { DeviceMock } from "./mocks/device.mock";
import { ScreenshotMock } from "./mocks/screenshot.mock";
import { ShakeMock } from "./mocks/shake.mock";


export function configureLogging(loggingService: LoggingService): () => void {
	return () => loggingService.configure(environment.logging);
}
export function appVersionFactory(): AppVersion {
	return environment.mocks.useMocks ? new AppVersionMock() : new AppVersion();
}
export function deviceFactory(): Device {
	return environment.mocks.useMocks ? new DeviceMock() : new Device();
}
export function screenshotFactory(): Screenshot {
	return environment.mocks.useMocks ? new ScreenshotMock() : new Screenshot();
}
export function shakeFactory(): Shake {
	return environment.mocks.useMocks ? new ShakeMock() : new Shake();
}

@NgModule({
	declarations: [
		AppComponent,
	],
	entryComponents: [
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		LoggingServiceModule,
		FeedbackModule,
	],
	providers: [
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy,
		},
		{
			deps: [LoggingService],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: configureLogging,
		},
		{ provide: AppVersion, useFactory: appVersionFactory },
		{ provide: Device, useFactory: deviceFactory },
		{ provide: Screenshot, useFactory: screenshotFactory },
		{ provide: Shake, useFactory: shakeFactory },
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
