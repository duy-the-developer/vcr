#!/usr/bin/env node

/**
 * verbose-correction-reporting
 * Tool to auto-generate reporting messages for instructors to paste into staff-chat because the leads can't be bothered to check github PR for correction statuses.
 *
 * @author duy-the-developer <duynguyen.ca>
 */

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'
import { exec, execSync } from 'child_process'
import clipboard from 'clipboardy'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

const encoding = { encoding: 'utf-8' }

;(async () => {
  init({ clear })
  input.includes(`help`) && cli.showHelp(0)

  debug && log(flags)

  if (input.includes('cr')) {
    const prNum = input[1]
    try {
      if (!prNum || typeof prNum !== 'number')
        throw new Error('PR number required')

      const repo = execSync(
        `gh repo view --json name -q ".name"`,
        encoding
      ).replace('\n', '')

      console.log(
        `Checking out [ ${repo} | PR #${prNum} ] using Github CLI, please wait...`
      )

      // checkout the pr number
      execSync(`gh pr checkout ${prNum}`, {
        encoding: 'utf-8',
      })

      // get status
      const prStatus = execSync(
        `gh pr view --json author,createdAt,id,labels,number,title,updatedAt,url,reviews`,
        encoding
      )

      const {
        author: { login },
        number,
        title,
        url,
      } = JSON.parse(prStatus)

      const output = `I will be working on \`${repo}\`, PR \`#${number}\`, title: \`${title}\`, from \`${login}\` on github.com at: \`${url}\``

      console.log(output)

      clipboard.writeSync(output)
    } catch (error) {
      console.error(error)
    }
  }

  if (input.includes('mark')) {
    const mark = input[1]
    const possibleValues = [75, 100]
    try {
      if (!possibleValues.includes(mark))
        throw new Error(
          'Mark percentage is required, possible values: 75 | 100'
        )

      // get pr info
      const prStatus = execSync(
        `gh pr view --json author,createdAt,id,labels,number,title,updatedAt,url,reviews`,
        encoding
      )

      const {
        author: { login },
        createdAt,
        id,
        labels,
        number,
        reviews,
        title,
        updatedAt,
        url,
      } = JSON.parse(prStatus)

      console.log(`Leaving a review comment on PR #${number} by [${login}]`)

      // add comment
      const commentOutput = execSync(
        `gh pr review --comment -b "Very well done @${login}, you reached ${mark}%!${
          mark !== 100 &&
          ' If you wish to push for 100%, please open another PR.'
        }"`,
        encoding
      )
      console.log(commentOutput)

      // add label
      const addLabelOutput = execSync(
        `gh pr edit --add-label ":heavy_check_mark: Completed"`,
        encoding
      )
      console.log(addLabelOutput)

      // close PR
      const prCloseOutput = execSync(`gh pr close ${number}`, encoding)
      console.log(prCloseOutput)
    } catch (error) {
      console.error(error)
    }
  }
})()
