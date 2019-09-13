# Puppet Master

> [Puppeteer](https://pptr.dev) as a service.

## Features

- Sensible defaults but lots of customizability

## Introduction

TODO

## Functions

### Screenshot

Navigates to a page and captures a screenshot via Puppeteer's [Page.screenshot](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagescreenshotoptions).

Returns a raw image in either `png` or `jpeg` format depending on the `type` parameter.

## Common Options

In addition to the standard parameters, all functions optionally accept a set of additional common options.

- [viewport](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetviewportviewport) - Set the browser window's viewport dimensions and/or resolution.
- [userAgent](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetuseragentuseragent) - Set the browser's [user-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).
  - Useful to trick websites into displaying different content or styles based on an emulated device.
  - See also [avoiding detection](#avoiding-detection).
- [gotoOptions](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagegotourl-options) - Customize the `Page.goto` navigation options.
  - Useful when you need to customize behavior around when Puppeteer considers a page navigation "finished".
- [emulateDevice](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pageemulateoptions) - Make it look like the screenshot was taken on the specified device.
  - Use the `name` property from one of the built-in [devices](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js).
  - Overrides `viewport` and `userAgent`.

## Avoiding Detection

TODO
- Some websites go to great lengths to

## FAQ

### Where can I find some example user agent strings?

TODO
https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js

### Why are my screenshots blurry?

Try setting [viewport.deviceScaleFactor](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetviewportviewport) to `2` to emulate a retina display.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)
