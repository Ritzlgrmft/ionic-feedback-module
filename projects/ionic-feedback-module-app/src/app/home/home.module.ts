import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { FeedbackModule } from "ionic-feedback-module";

import { SettingsModalComponent } from "../settings/settings-modal.component";
import { HomePage } from "./home.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild([
			{
				path: "",
				component: HomePage,
			},
		]),
		FeedbackModule,
	],
	declarations: [
		HomePage,
		SettingsModalComponent,
	],
	entryComponents: [
		HomePage,
		SettingsModalComponent,
	],
})
export class HomePageModule { }
