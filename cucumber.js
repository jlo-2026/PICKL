/* eslint-env node */
export default {
  default: {
    tags: process.env.TAGS || 'not @skip',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['test/features/'],
    import: ['test/support/**/*.ts', 'test/steps/**/*.ts'],
    dryRun: false,
    format: [
      'progress',
      'summary',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    parallel: 1,
    timeout: 60000, // 60 seconds for hooks and steps
    World: './test/support/world.ts',
  },

  chromium: {
    tags: process.env.TAGS || 'not @skip',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['test/features/'],
    format: [
      'progress',
      'summary',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    parallel: 1,
    timeout: 60000,
    World: './test/support/world.ts',
    worldParameters: {
      browser: 'chromium',
    },
  },

  firefox: {
    tags: process.env.TAGS || 'not @skip',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['test/features/'],
    format: [
      'progress',
      'summary',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    parallel: 1,
    timeout: 60000,
    World: './test/support/world.ts',
    worldParameters: {
      browser: 'firefox',
    },
  },

  webkit: {
    tags: process.env.TAGS || 'not @skip',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['test/features/'],
    format: [
      'progress',
      'summary',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    parallel: 1,
    timeout: 60000,
    World: './test/support/world.ts',
    worldParameters: {
      browser: 'webkit',
    },
  },
}
