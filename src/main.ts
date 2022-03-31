import * as core from '@actions/core'
const github = require('@actions/github')

import {determineTags} from './utils/determineTags'

async function run(): Promise<void> {
  try {
    const tickets = core.getInput('tickets')
    const {context} = github
    const eventName: string = context.event_name
    const branchName: string = context.ref_name

    const finalTags = determineTags({branchName, eventName, tickets})

    core.setOutput('tags', finalTags)
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message)
    }
  }
}

run()
