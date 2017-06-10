import { AttachmentState } from "./attachment-state.model";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

export interface FeedbackConfiguration {

	isEnabled: boolean;

	url: string;

	language: string;
	translation: FeedbackViewerTranslation;
	categories: string[];
	attachScreenshot: AttachmentState;
	attachDeviceInfo: AttachmentState;
	attachAppInfo: AttachmentState;
	attachLogMessages: AttachmentState;
}
