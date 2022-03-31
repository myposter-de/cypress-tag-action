import { expect, describe, test } from '@jest/globals';
import { determineTags } from '../src/utils/determineTags';

const testCases = [
  [
    {
      tickets: 'FESH-123',
      eventName: 'schedule',
      branchName: 'master'
    },
    'master,FESH-123'
  ],
  [
    {
      tickets: 'FESH-123',
      eventName: 'schedule',
      branchName: 'feature/FESH-123'
    },
    'schedule,FESH-123'
  ],
  [
    {
      tickets: '',
      eventName: 'schedule',
      branchName: 'feature/FESH-123'
    },
    'schedule'
  ],
  [
    {
      tickets: '',
      eventName: 'pull_request',
      branchName: 'master'
    },
    'master'
  ],
  [
    {
      tickets: 'FESH-123, BESH-234',
      eventName: 'schedule',
      branchName: 'feature/FESH-123'
    },
    'schedule,FESH-123,BESH-234'
  ],
  [
    {
      tickets: '',
      eventName: '',
      branchName: ''
    },
    ''
  ]
];

describe('should return correct tags', () => {
  test.each(testCases)('tags for %s', (testCase, res) => {
    const result = determineTags(testCase);
    expect(result).toEqual(res);
  });
});
