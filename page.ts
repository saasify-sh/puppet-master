import { Browser, Page, devices, launch } from 'puppeteer-core'

import { getLaunchOptions } from './options'
import { CommonOptions } from './types'

// cache the current chrome instance between serverless invocations
let _browser: Browser | null = null

export async function getPage(opts: CommonOptions): Promise<Page> {
  if (!_browser) {
    const options = await getLaunchOptions()
    _browser = await launch(options)
  }

  const page = await _browser.newPage()
  return initPage(page, opts)
}

export async function initPage(page: Page, opts: CommonOptions): Promise<Page> {
  if (opts.emulateDevice) {
    const device = devices[opts.emulateDevice]
    if (!device) {
      const err = new Error(`Invalid device name [${opts.emulateDevice}]`);
      (err as any).statusCode = 400
      throw err
    }

    await page.emulate(device)
  } else {
    if (opts.userAgent) {
      await page.setUserAgent(opts.userAgent)
    }

    if (opts.viewport) {
      await page.setViewport(opts.viewport)
    }
  }

  await page.goto(opts.url, opts.gotoOptions)
  return page
}
