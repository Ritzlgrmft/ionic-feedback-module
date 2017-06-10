/**
 * Describes all values needed in a translation.
 */
export interface FeedbackViewerTranslation {
	/**
	 * Title of the modal.
	 */
	title: string;

	/**
	 * Cancel button.
	 * This text is shown only on iOS.
	 * On Android or Windows, just an close-icon is used.
	 */
	cancel: string;

	/**
	 * Send button.
	 */
	send: string;

	/**
	 * Message placeholder.
	 */
	message: string;

	/**
	 * Name placeholder.
	 */
	name: string;

	/**
	 * Email placeholder.
	 */
	email: string;

	/**
	 * Include screenshot label.
	 */
	includeScreenshot: string;

	/**
	 * Include device info label.
	 */
	includeDeviceInfo: string;

	/**
	 * Include app info label.
	 */
	includeAppInfo: string;

	/**
	 * Include log label.
	 */
	includeLogMessages: string;

	/**
	 * OK button.
	 */
	ok: string;

	/**
	 * Error message, if feedback could not be sent.
	 */
	errorSending: string;

	/**
	 * Manufacturer (part of device info).
	 */
	manufacturer: string;

	/**
	 * Model (part of device info).
	 */
	model: string;

	/**
	 * UUID (part of device info).
	 */
	uuid: string;

	/**
	 * Serial (part of device info).
	 */
	serial: string;

	/**
	 * Platform (part of device info).
	 */
	platform: string;

	/**
	 * Version (part of device info).
	 */
	version: string;

	/**
	 * Cordova version (part of device info).
	 */
	cordova: string;

	/**
	 * Flag if device is virtual (part of device info).
	 */
	isVirtual: string;

	/**
	 * Name of the app (part of app info).
	 */
	appName: string;

	/**
	 * Name of the package (part of app info).
	 */
	packageName: string;

	/**
	 * Version code of the app (part of app info).
	 */
	versionCode: string;

	/**
	 * Version number of the app (part of app info).
	 */
	versionNumber: string;
}
