import { HttpResponse } from 'fts-core'
import {
  DirectNavigationOptions,
  PDFOptions,
  PDFFormat,
  LayoutDimension,
  Viewport
} from 'puppeteer-core'

import { getPage } from './page'
import { ImageFormat, Margin, Rect } from './types'

/**
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
 */
export default async function getScreenshot(
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
