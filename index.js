#!/usr/bin/env node

/**
 * verbose-correction-reporting-for-concordia-full-stack-web-development-bootcamp-instructors
 * Tool to auto-generate reporting messages for instructors to paste into staff-chat because the leads can't be bothered to check github PR for correction statuses.
 *
 * @author duy-the-developer <duynguyen.ca>
 */

import init from './utils/init.js'
import cli from './utils/cli.js'
import log from './utils/log.js'
import { execSync } from 'child_process'
import clipboard from 'clipboardy'

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

;(async () => {
  init({ clear })
  input.includes(`help`) && cli.showHelp(0)

  debug && log(flags)

  if (input.includes('cr')) {
    const prNum = input[1]
    try {
      if (!prNum || typeof prNum !== 'number')
        throw new Error('PR number required')

      console.log(
        `Checking out pull request #${prNum} using Github CLI, please wait...`
      )

      // checkout the pr number
      execSync(`gh pr checkout ${prNum}`, {
        encoding: 'utf-8',
      })

      // get status
      const prStatus = execSync(
        `gh pr status --json author,comments,headRefName,id,labels,number,state,title,updatedAt,url`,
        { encoding: 'utf-8' }
      )

      const {
        currentBranch: {
          author: { login },
          id,
          labels = ['no'],
          number,
          title,
          updatedAt,
          url,
        },
      } = JSON.parse(prStatus)

      const output = `I will be working on Pull Request #${number}, title: ${title}, id: ${id}, from ${login} on github.com. Currently the PR has ${labels[0]} label, and it was last updated on ${updatedAt}. They have already submitted their workshop.I requested ${flags.numChangesRequested} changes. I will verify that all requested changes have in fact been changed properly. Here is the pull request in question: ${url}`

      console.log(output)

      clipboard.writeSync(output)
    } catch (error) {
      console.error(error)
    }
  }
})()
