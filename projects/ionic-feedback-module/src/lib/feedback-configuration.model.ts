import { AttachmentState } from "./attachment-state.model";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

export interface FeedbackConfiguration {

	isEnabled: boolean;

	appKey?: string;
	appSecret?: string;
	url?: string;

	language?: string;
	translation?: FeedbackViewerTranslation;
	categories?: string[];
	attachScreenshot?: AttachmentState | string;
	attachDeviceInfo?: AttachmentState | string;
	attachAppInfo?: AttachmentState | string;
	attachLogMessages?: AttachmentState | string;
}
