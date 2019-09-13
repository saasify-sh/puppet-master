import {
  DirectNavigationOptions,
  Viewport
} from 'puppeteer-core'

export type ImageFormat = 'png' | 'jpeg'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface Margin {
  /** Top margin. */
  top?: number,
  /** Right margin. */
  right?: number,
  /** Bottom margin. */
  bottom?: number,
  /** Left margin. */
  left?: number
}

export interface CommonOptions {
  url: string
  gotoOptions?: DirectNavigationOptions
  viewport?: Viewport
  userAgent?: string
  emulateDevice?: string
}
