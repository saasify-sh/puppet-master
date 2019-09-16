import chrome = require('chrome-aws-lambda')

const isDev = process.env.NOW_REGION === 'dev1'
const isDebug = isDev && process.env.PUPPET_MASTER_DEBUG

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
    const debugParams = isDebug ? {
      headless: false,
      slowMo: 1000
    } : {
      headless: true
    }

    return {
      args: [],
      executablePath: exePath,
      ...debugParams
    }
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }
}
