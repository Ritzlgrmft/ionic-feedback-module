import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FeedbackViewerModalService } from "./feedback-viewer-modal.service";
import { FeedbackViewerModalComponent } from "./feedback-viewer-modal/feedback-viewer-modal.component";

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
	entryComponents: [
		FeedbackViewerModalComponent,
	],
	exports: [
		FeedbackViewerModalComponent,
	],
	providers: [
		FeedbackViewerModalService,
	],
})
export class FeedbackModule { }
