# ionic-feedback-module

**The dependencies used by the latest version are the same as needed for [Ionic 3.3.0](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md).**

[![Build](https://travis-ci.org/Ritzlgrmft/ionic-feedback-module.svg?branch=master)](https://travis-ci.org/Ritzlgrmft/ionic-feedback-module)
[![Version](https://badge.fury.io/js/ionic-feedback-module.svg)](https://www.npmjs.com/package/ionic-feedback-module)
[![Downloads](https://img.shields.io/npm/dt/ionic-feedback-module.svg)](https://www.npmjs.com/package/ionic-feedback-module)
[![Dependencies](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master/status.svg)](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master)
[![Peer-Dependencies](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master/peer-status.svg)](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master?type=peer)
[![Dev-Dependencies](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master/dev-status.svg)](https://david-dm.org/ritzlgrmft/ionic-feedback-module/master?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/ritzlgrmft/ionic-feedback-module/badge.svg)](https://snyk.io/test/github/ritzlgrmft/ionic-feedback-module)
[![License](https://img.shields.io/npm/l/ionic-feedback-module.svg)](https://www.npmjs.com/package/ionic-feedback-module)

The module is thought as an easy to integrate solution for sending feedback. Typically, the user shakes her device, a popup opens, the user can enter what went wrong, and finally the report is sent, including some additional information like screenshot, logs, app and device info.

The report is sent to a web service, which can do anything with the data, e.g. forward by mail to the
developer, store it in a database, ...

A sample app using this module is [ionic-feedback-sample](https://github.com/Ritzlgrmft/ionic-feedback-sample).

A sample backend web service is [ionic-feedback-backend](https://github.com/Ritzlgrmft/ionic-feedback-backend).

## Screenshots

tbd

## Usage

### npm package

```bash
npm install ionic-feedback-module --save
```

### Cordova plugins

Additionally, you will need some Cordova plugins:

- [Screenshot](https://github.com/gitawego/cordova-screenshot)
- [AppVersion](https://github.com/whiteoctober/cordova-plugin-app-version)
- [Device](https://github.com/apache/cordova-plugin-device)
- [Shake](https://github.com/leecrossley/cordova-plugin-shake)

### import module

In your `app.module.ts`, you have to import the module:

```typescript
import { FeedbackModule } from "ionic-feedback-module";

@NgModule({
  ...
  imports: [
    FeedbackModule,
    ...
  ],
```

### registering for Shake events

In your `app.component.ts`, you have to inject 2 components into your constructor:

- `FeedbackService`: processes the shake
- `FeedbackViewerModalManager`: shows a modal in case of a shake event

```typescript
import { FeedbackService, FeedbackViewerModalManager } from "ionic-feedback-module";

constructor(
  platform: Platform,
  feedbackService: FeedbackService,
  private feedbackViewerModalManager: FeedbackViewerModalManager) {

  platform.ready().then(() => {
    feedbackService.shaken.subscribe(() => {
      this.feedbackViewerModalManager.openModal();
    });
    feedbackService.startWatchForShake();
  });
}
```

### Configuration

The configuration is done with the [ionic-configuration-service](https://github.com/Ritzlgrmft/ionic-configuration-service).

The specific configuration for the `ionic-feedback-module` is taken from the key `feedback`.
Its structure is defined in the interface [FeedbackConfiguration](src/feedback-configuration.model.ts).

- `isEnabled`: the `shaken` event is fired only if this is set to true
- `appKey`: app key used for authorization with the backend (see below)
- `appSecret`: app secret used for authorization with the backend (see below)
- `url`: url of the backend (see below)
- `language`: language used for the modal; see "multi language support"
- `translation`: custom language used for the modal; see "multi language support"
- `categories`: array of categories shown in the modal; could be something like `error`, `improvement`, `smile`, `frown`, ...
- `attachScreenshot`: specifies, if a screenshot should be attached; valid values are `Yes`, `No` and `Ask` (ask the user if she wants to include it)
  this requires the [Screenshot](https://github.com/gitawego/cordova-screenshot) plugin
- `attachDeviceInfo`: specifies, if device info should be attached; valid values are `Yes`, `No` and `Ask` (ask the user if she wants to include it)
  this requires the [Device](https://github.com/apache/cordova-plugin-device) plugin
- `attachAppInfo`: specifies, if app info should be attached; valid values are `Yes`, `No` and `Ask` (ask the user if she wants to include it)
  this requires the [AppVersion](https://github.com/whiteoctober/cordova-plugin-app-version) plugin
- `attachLogMessages`: specifies, if log messages should be attached; valid values are `Yes`, `No` and `Ask` (ask the user if she wants to include it)

### Backend

For the backend, you need a service which can process the message with all provided infos.
As a reference implementation, you can use [ionic-feedback-backend](https://github.com/Ritzlgrmft/ionic-feedback-backend). This implementation is also deployed
to [Azure](https://ionic-feedback-backend.azurewebsites.net). There is also the Swagger documentation
of the service available.

If you want, you can also use this implementation for your app. But in this case, you need to register
your app. As a result of the registration you will get your own `AppKey` and `AppSecret`. Every feedback
will be sent by mail to an email address you specified.

So, if you are still interested in using this backend, just drop me a note.

### multi language support

With `language` parameter in the configuration, you can
use to select the language. Currently `en` and `de` are supported.

If you need another language, either open an issue, or just use the `translation` configuration.
This parameter you can use to pass your completely own texts.
Just fill the `FeedbackViewerTranslation` object.

## API

### FeedbackService

#### shaken: EventEmitter&lt;void>

Event which will be emitted, if the device was shaken.

#### configuration: FeedbackConfiguration

Configuration of the service. Can be modified also during runtime.

#### contact: FeedbackContact

Name and email address of the current user. Could be set in advance, e.g. with the data of the logged-in user.

#### async startWatchForShake(): Promise&lt;void>

Start watching for shake events. In case of such an event, the *shaken* event is fired.
Be sure to register first for the event before calling this method.

### FeedbackViewerModalManager

### openModal(language: string, translation: FeedbackViewerTranslation, categories: string[], name: string, email: string, attachScreenshot: AttachmentState, attachDeviceInfo: AttachmentState, attachAppInfo: AttachmentState, attachLogMessages: AttachmentState): Promise&lt;void>

Opens the modal.

Parameters

- *language*: language used for the modal (currently only `en` or `de`).
  If *translation* is passed as well, the language will be ignored. Default: value from configuration.
- *translation*: custom values for the translatable texts. Default: value from configuration.
- *categories*: possible categories for the drop-down. Default: value from configuration.
- *name*: name of the current user. Default: value from `FeedbackService.contact`.
- *email*: email of the current user. Default: value from `FeedbackService.contact`.
- *attachScreenshot*: flag if the screenshot should be attached. Default: value from configuration.
- *attachDeviceInfo*: flag if the device info should be attached. Default: value from configuration.
- *attachAppInfo*: flag if the app info should be attached. Default: value from configuration.
- *attachLogMessages*: flag if the log messages should be attached. Default: value from configuration.

Returns

- Promise which gets resolved as soon as the modal is shown.

Example

```typescript
manager.openModal(undefined, { title: "ttt", buttonCancel: "bc" })
  .then(() => {
  });
```

### modalClosed: EventEmitter&lt;void>

Event triggered when the modal was closed..
