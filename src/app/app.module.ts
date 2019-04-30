import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { LoggingService, LoggingServiceModule } from "ionic-logging-service";

import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

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
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{
			deps: [LoggingService],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: configureLogging,
		},
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
