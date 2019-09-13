import { HttpResponse } from 'fts-core'
import {
  DirectNavigationOptions,
  BinaryScreenShotOptions,
  Viewport
} from 'puppeteer-core'

import { getPage } from './page'
import { ImageFormat, Rect } from './types'

export default async function getScreenshot(
  url: string,
  type: ImageFormat = 'png',
  quality: number = 100,
  fullPage: boolean = false,
  omitBackground: boolean = true,
  clip?: Rect,
  gotoOptions?: DirectNavigationOptions,
  viewport?: Viewport,
  userAgent?: string,
  emulateDevice?: string
): Promise<HttpResponse> {
  const page = await getPage({
    url,
    gotoOptions,
    viewport,
    userAgent,
    emulateDevice
  })

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
  await page.close()

  return {
    headers: {
      'Content-Type': (type === 'png' ? 'image/png' : 'image/jpeg')
    },
    statusCode: 200,
    body
  }
}
