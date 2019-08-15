# ionic-feedback-module workspace

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

The workspace contains these projects:

## ionic-feedback-module

The feedback component. For further info have a look at the [component's readme](https://github.com/Ritzlgrmft/ionic-feedback-module/blob/master/projects/ionic-feedback-module/README.md).

Useful commands:

* `npm run build`
* `npm test`
* `npm run compodoc`

## ionic-feedback-module-app

A test app for the `ionic-feedback-module` as well as a sample app.

Useful commands:

* `ionic serve --project ionic-feedback-module-app`
* `ionic cordova platform add ios`  
`ionic cordova emulate ios --target iPhone-X --livereload`

## ionic-feedback-module-app-e2e

End-to-end tests of the `ionic-feedback-module` component.

Useful commands:

* `npm run e2e`
