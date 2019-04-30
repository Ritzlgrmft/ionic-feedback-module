import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FeedbackViewerModalComponent } from "./feedback-viewer-modal/feedback-viewer-modal.component";
import { FeedbackService } from "./feedback.service";

@NgModule({
	declarations: [
		FeedbackViewerModalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		IonicModule,
	],
	exports: [
		FeedbackViewerModalComponent,
	],
	providers: [
		FeedbackService,
	],
})
export class FeedbackModule { }
