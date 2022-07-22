import * as core from '@actions/core';
const github = require('@actions/github');

import { determineTags } from './utils/determineTags';

async function run(): Promise<void> {
  try {
    const tickets = core.getInput('tickets');
    const branchInput: string = core.getInput('branch');
    const triggeredBy: string = core.getInput('triggeredBy') || "";

    const getBranch = (branch: string) => {
      let finalBranch = branch;
      const branchSplitted: Array<string> = branch.split('/');
      if (branchSplitted && branchSplitted.length > 0) {
        const poppedBranch = branchSplitted.pop();
        if (poppedBranch) {
          finalBranch = poppedBranch;
        }
      }

      return finalBranch;
    };
    const branchName: string = getBranch(branchInput);
    const { context } = github;
    const { eventName } = context;

    console.log('branchName event_name', branchName, eventName);

    const finalTags = determineTags({ branchName, eventName, triggeredBy, tickets });

    core.setOutput('tags', finalTags);
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message);
    }
  }
}

run();
