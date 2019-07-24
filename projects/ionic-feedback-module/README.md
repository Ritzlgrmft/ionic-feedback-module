# ionic-feedback-module

**The dependencies used by the latest version are the same as needed for [Ionic 4.0.0](https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md). For older versions use:**

| ionic-feedback-module | Ionic | Angular
| ----- | -------- | ------
| 5.0.0 | >= 4.0.0 | ^7.0.0
| 4.0.0 | >= 3.9.0 | ^5.0.0
| 3.0.0 | >= 3.0.0 | ^4.0.0

The module is thought as an easy to integrate solution for sending feedback. Typically, the user shakes her device, a popup opens, the user can enter what went wrong, and finally the report is sent, including some additional information like screenshot, logs, app and device info.

The report is sent to a web service, which can do anything with the data, e.g. forward by mail to the
developer, store it in a database, ...

A sample app using this module is [ionic-feedback-sample](https://github.com/Ritzlgrmft/ionic-feedback-sample).

A sample backend web service is [ionic-feedback-backend](https://github.com/Ritzlgrmft/ionic-feedback-backend).

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
- `FeedbackViewerModalService`: shows a modal in case of a shake event

```typescript
import { FeedbackService, FeedbackViewerModalService } from "ionic-feedback-module";

constructor(
  platform: Platform,
  feedbackService: FeedbackService,
  private feedbackViewerModalService: FeedbackViewerModalService) {

  platform.ready().then(() => {
    feedbackService.shaken.subscribe(() => {
      this.feedbackViewerModalService.openModal();
    });
    feedbackService.startWatchForShake();
  });
}
```

### Configuration

It is recommended to place the configuration in `environment.ts`:

```typescript
export const environment = {
  feedback: {
    ...
  }
}
```

Just call `configure' before regisstering for shake events:

```typescript
feedbackService.configure(environment.feedback);
```

Its structure is defined in the interface `FeedbackConfiguration`:

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

see [API documentation](https://ritzlgrmft.github.io/ionic-feedback-module/index.html).
