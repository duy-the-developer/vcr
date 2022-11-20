import meow from 'meow'
import meowHelp from 'cli-meow-help'

const flags = {
  clear: {
    type: `boolean`,
    default: false,
    alias: `c`,
    desc: `Clear the console`,
  },
  noClear: {
    type: `boolean`,
    default: true,
    desc: `Don't clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
  numChangesRequested: {
    type: 'number',
    alias: 'n',
    desc: 'Number of changes requested',
    default: 0,
  },
}

const commands = {
  help: { desc: `Print help info` },
}

const helpText = meowHelp({
  name: `vcr`,
  flags,
  commands,
})

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
}

export default meow(helpText, options)
