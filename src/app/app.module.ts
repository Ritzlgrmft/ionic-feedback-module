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

import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppVersionMock } from "./mocks/app-version.mock";
import { DeviceMock } from "./mocks/device.mock";

export function configureLogging(loggingService: LoggingService): () => void {
	return () => loggingService.configure(environment.logging);
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
		{ provide: AppVersion, useClass: AppVersionMock },
		{ provide: Device, useClass: DeviceMock },
		Screenshot,
		Shake,
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
