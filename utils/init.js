import welcome from 'cli-welcome'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./../package.json')
import cliHandleUnhandled from 'cli-handle-unhandled'

const init = ({ clear = true }) => {
  cliHandleUnhandled()
  welcome({
    title: `verbose-correction-reporting-for-concordia-full-stack-web-development-bootcamp-instructors`,
    tagLine: `by duy-the-developer`,
    description: pkg.description,
    version: pkg.version,
    bgColor: '#36BB09',
    color: '#000000',
    bold: true,
    clear,
  })
}

export default init
