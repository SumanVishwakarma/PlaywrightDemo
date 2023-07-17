const scanner = require('sonarqube-scanner');

const options = {
    'sonar.projectKey': 'timezone-automation',
    'sonar.projectName': 'timezone-automation',
    'sonar.sources': 'server',
    'sonar.tests': 'spec',
    'sonar.test.inclusions': 'spec/**/*.test.jsx,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
    'sonar.testExecutionReportPaths': 'test-report.xml',
    //'sonar.eslint.reportPaths': 'eslint-report.json', //if your are using eslint reports then add or else ignore this.
};

if (process.env.CI) {
    if (process.env.IS_PULL_REQUEST_MERGED === 'true') {
        options['sonar.branch.name'] = process.env.BASE_BRANCH;
    } else {
        options['sonar.pullrequest.key'] = process.env.PR_ID;
        options['sonar.pullrequest.base'] = process.env.BASE_BRANCH;
        options['sonar.pullrequest.branch'] = process.env.HEAD_BRANCH;
    }
} else {
    const getCurrentBranchName = require('node-git-current-branch');
    options['sonar.branch.name'] = getCurrentBranchName();
}

scanner({
    serverUrl: 'https://sonar.anywhere.co', // hosted url for sonar 
    token: '${{ secrets.SONAR_TOKEN }}', // your project token
    options,
},

    () => process.exit(),
);