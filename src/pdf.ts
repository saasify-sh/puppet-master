import { HttpResponse } from 'fts-core'
import {
  DirectNavigationOptions,
  PDFOptions,
  PDFFormat,
  LayoutDimension,
  Viewport
} from 'puppeteer-core'

import { getPage } from './lib/page'
import { ImageFormat, Margin, Rect } from './lib/types'

/**
 * Navigates to a page and captures a PDF via Puppeteer's [Page.pdf](https://pptr.dev/#?product=Puppeteer&version=v1.19.0&show=api-pagepdfoptions).
 *
 * @param url - URL to navigate page to. The url should include scheme, e.g. `https://`.
 * @param scale - Scale of the webpage rendering.
 * @param displayHeaderFooter - Display header and footer.
 * @param headerTemplate - HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
 * - `date` formatted print date
 * - `title` document title
 * - `url` document location
 * - `pageNumber` current page number
 * - `totalPages` total pages in the document
 * @param footerTemplate - HTML template for the print footer. Should be valid HTML markup with following classes used to inject printing values into them:
 * - `date` formatted print date
 * - `title` document title
 * - `url` document location
 * - `pageNumber` current page number
 * - `totalPages` total pages in the document
 * @param printBackground - Print background graphics.
 * @param landscape - Paper orientation.
 * @param pageRanges - Paper ranges to print, e.g., `1-5, 8, 11-13`. Default is `''` which means print all pages.
 * @param format - Paper format. If set, takes priority over width or height options.
 * @param width - Paper width.
 * @param height - Paper height.
 * @param margin - Paper margins, defaults to none.
 * @param preferCSSPageSize - Give any CSS @page size declared in the page priority over what is declared in width and
 * height or format options. Defaults to `false` which will scale the content to fit the paper size.
 * @param gotoOptions - Customize the `Page.goto` navigation options.
 * @param viewport - Set the browser window's viewport dimensions and/or resolution.
 * @param userAgent - Set the browser's [user-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).
 * @param emulateDevice - Make it look like the screenshot was taken on the specified device.
 * - Use the `name` property from one of the built-in [devices](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js).
 * - Overrides `viewport` and `userAgent`.
 *
 * @returns PDF as `application/pdf`.
 */
export default async function getPdf(
  url: string,
  scale: number = 1,
  displayHeaderFooter: boolean = false,
  headerTemplate?: string,
  footerTemplate?: string,
  printBackground: boolean = false,
  landscape: boolean = false,
  pageRanges: string = '',
  format: PDFFormat = 'Letter',
  width?: LayoutDimension,
  height?: LayoutDimension,
  margin?: Margin,
  preferCSSPageSize: boolean = false,
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

  const opts: PDFOptions = {
    scale,
    displayHeaderFooter,
    headerTemplate,
    footerTemplate,
    printBackground,
    landscape,
    pageRanges,
    format,
    width,
    height,
    margin,
    preferCSSPageSize
  }

  const body = await page.pdf(opts)
  await page.close()

  return {
    headers: {
      'Content-Type': 'application/pdf'
    },
    statusCode: 200,
    body
  }
}
