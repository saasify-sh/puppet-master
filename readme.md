# Puppet Master

> [Puppeteer](https://pptr.dev) as a [service](https://puppet-master.sh).

<p align="center">
  <a href="https://puppet-master.sh" title="Puppet Master">
    <img src="https://raw.githubusercontent.com/saasify-sh/puppet-master/master/media/puppeteer-logo.png" alt="Puppeteer Logo" width="200" />
  </a>
</p>

## Features

- **Simple**: Quick to setup and integrate
- **Standard**: Just HTTPS + JSON
- **Managed**: Hosted via serverless functions
- **Scalable**: Scales to any capacity
- **Usage based**: Pay only for what you use
- **Focused**: We only do one thing and do it well
- **Immutable deployments**: All API updates are optional

## Contents

<!-- toc -->

- [Introduction](#introduction)
- [Functions](#functions)
  * [Screenshot](#screenshot)
  * [Pdf](#pdf)
  * [Common Options](#common-options)
- [FAQ](#faq)
  * [Where can I find some example user agent strings?](#where-can-i-find-some-example-user-agent-strings)
  * [Why are my screenshots blurry?](#why-are-my-screenshots-blurry)
  * [Debugging](#debugging)
- [License](#license)

<!-- tocstop -->

## Introduction

Puppet Master provides hosted, serverless SaaS APIs for controlling headless chrome in the cloud.

Our goal is to make it really simple for developers to scale automated browser workflows via [Puppeteer](https://pptr.dev).

## Functions

### Screenshot

Navigates to a page and captures a screenshot via Puppeteer's [Page.screenshot](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagescreenshotoptions).

All Puppeteer options are supported.

Returns an image as either `image/png` or `image/jpeg` depending on the `type` parameter.

### Pdf

Navigates to a page and captures a PDF via Puppeteer's [Page.pdf](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagepdfoptions).

All Puppeteer options are supported.

Returns a PDF as `application/pdf`.

### Common Options

In addition to the standard parameters, all functions optionally accept a set of additional common options.

- [viewport](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetviewportviewport) - Set the browser window's viewport dimensions and/or resolution.
- [userAgent](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetuseragentuseragent) - Set the browser's [user-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).
  - Useful to trick websites into displaying different content or styles based on an emulated device.
- [gotoOptions](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagegotourl-options) - Customize the `Page.goto` navigation options.
  - Useful when you need to customize behavior around when Puppeteer considers a page navigation "finished".
- [emulateDevice](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pageemulateoptions) - Make it look like the screenshot was taken on the specified device.
  - Use the `name` property from one of the built-in [devices](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js).
  - Overrides `viewport` and `userAgent`.

## FAQ

### How is this project different from other alternatives?

There are

**Functionality**

- scale via serverless functions
- usage based
- don't have to deal with servers or async task queues

**Philisophy**

The core motivation behind this project lies in trying to tackle the problem of open source sustainability.

Towards that end, every aspect of this SaaS product aside from the core functionality was generated automatically via [Saasify](https://saasify.sh), the Shopify for SaaS. That includes the template-based marketing website, OpenAPI-based API docs, serverless function hosting, user account management, usage-based billing integration, legal docs, and support.

It's our hope that by greatly simplifying and automating the process of launching simple, focused SaaS APIs, open source authors will be much more inclined to monetize their work based on usage and impact while still holding true to the underlying nature of OSS.

Puppet Master is therefore a SaaS product that is fully generated from the source code in this repository. If you know how to create an open source TypeScript project like this one, you're already 95% of your way towards creating your first monetizable SaaS product!

###

### Why are my screenshots blurry?

Try setting [viewport.deviceScaleFactor](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagesetviewportviewport) to `2` to emulate a retina display.

### Where can I find some example user agent strings?

TODO
https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js

### Is there any way I can debug issues with the API?

If your API calls are not working or returning unexpected results, the best way to troubleshoot is to try and reproduce the issue by running the project locally.

- Clone this repository
- Install `saasify` globally via `npm install -g saasify`
- Run `saasify dev` at the repo root specifying an additional environment variable `PUPPET_MASTER_DEBUG`

```
PUPPET_MASTER_DEBUG=1 saasify dev
```

This will run the deployment locally with a non-headless browser and `slowMo` set to `1000`.

Then just change the URL you're calling to be the corresponding `localhost` URL and investigate the issue.

## License

MIT © [Saasify](https://saasify.sh)
