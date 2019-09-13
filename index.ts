import { HttpResponse } from 'fts-core'
import {
  launch,
  Page,
  DirectNavigationOptions,
  BinaryScreenShotOptions,
  Viewport
} from 'puppeteer-core'

import { getOptions } from './options'
import { ImageFormat, Rect } from './types'

// cache the current chrome instance / page between serverless invocations
let _page: Page | null

export default async function getScreenshot(
  url: string,
  type: ImageFormat = 'png',
  quality: number = 100,
  fullPage: boolean = false,
  omitBackground: boolean = true,
  clip?: Rect,
  gotoOptions?: DirectNavigationOptions,
  viewport?: Viewport,
  userAgent?: string
): Promise<HttpResponse> {
  const page = await getPage()

  if (userAgent) {
    await page.setUserAgent(userAgent)
  }

  if (viewport) {
    await page.setViewport(viewport)
  }

  await page.goto(url, gotoOptions)

  const opts: BinaryScreenShotOptions = {
    type,
    fullPage,
    omitBackground,
    clip
  }

  if (type === 'jpeg') {
    opts.quality = quality
  }

  const body = await page.screenshot(opts)

  return {
    headers: {
      'Content-Type': (type === 'png' ? 'image/png' : 'image/jpeg')
    },
    statusCode: 200,
    body
  }
}

async function getPage() {
  if (_page) {
    return _page
  }
  const options = await getOptions()
  const browser = await launch(options)
  _page = await browser.newPage()
  return _page
}
