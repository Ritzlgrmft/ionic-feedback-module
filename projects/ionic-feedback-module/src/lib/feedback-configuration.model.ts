import { AttachmentState } from "./attachment-state.model";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

/**
 * Partial configuration definition for FeedbackService.
 */

export interface FeedbackConfiguration {

	/**
	 * The `shaken` event is fired only if this is set to true.
	 */
	isEnabled: boolean;

	/**
	 * App key used for authorization with the backend.
	 */
	appKey?: string;
	/**
	 * App secret used for authorization with the backend.
	 */
	appSecret?: string;
	/**
	 * Url of the backend.
	 */
	url?: string;

	/**
	 * Language used for the modal.
	 */
	language?: string;
	/**
	 * Custom language used for the modal.
	 */
	translation?: FeedbackViewerTranslation;
	/**
	 * Array of categories shown in the modal; could be something like `error`, `improvement`, `smile`, `frown`, ...
	 */
	categories?: string[];
	/**
	 * Specifies, if a screenshot should be attached.
	 */
	attachScreenshot?: AttachmentState;
	/**
	 * Specifies, if the device info should be attached.
	 */
	attachDeviceInfo?: AttachmentState;
	/**
	 * Specifies, if the app info should be attached.
	 */
	attachAppInfo?: AttachmentState;
	/**
	 * Specifies, if the log messages should be attached.
	 */
	attachLogMessages?: AttachmentState;
}
