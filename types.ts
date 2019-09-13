import {
  DirectNavigationOptions,
  LayoutDimension,
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
  top?: LayoutDimension,
  /** Right margin. */
  right?: LayoutDimension,
  /** Bottom margin. */
  bottom?: LayoutDimension,
  /** Left margin. */
  left?: LayoutDimension
}

export interface CommonOptions {
  url: string
  gotoOptions?: DirectNavigationOptions
  viewport?: Viewport
  userAgent?: string
  emulateDevice?: string
}
