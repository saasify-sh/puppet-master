import chrome = require('chrome-aws-lambda')

const isDev = process.env.NOW_REGION === 'dev1'

const exePath = process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

interface Options {
  args: string[]
  executablePath: string
  headless: boolean
}

export async function getLaunchOptions(): Promise<Options> {
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }
}
