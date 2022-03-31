import * as core from '@actions/core';
const github = require('@actions/github');

import { determineTags } from './utils/determineTags';

async function run(): Promise<void> {
  try {
    const tickets = core.getInput('tickets');
    const branchInput: string = core.getInput('branch');
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
    const eventName: string = context.event_name;

    console.log('branchName', branchName);

    const finalTags = determineTags({ branchName, eventName, tickets });

    core.setOutput('tags', finalTags);
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message);
    }
  }
}

run();
