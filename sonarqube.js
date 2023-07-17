const scanner = require('sonarqube-scanner');

const host = 'https://sonar.anywhere.co'


const token = process.argv[3];

const options = {
    'sonar.projectKey': 'PlaywrightDemo',
    'sonar.projectName': 'PlaywrightDemo',
    'sonar.sourceEncoding': 'UTF-8',
    //'sonar.sources': 'src',
    'sonar.tests': 'tests/',
    //  'sonar.exclusions': 'src/index.js, src/**/index.js, src/assets/**/*',
    // 'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    //  'sonar.testExecutionReportPaths': 'test-report.xml',
};

const setupOptionsForReleaseScan = (baseBranch) => {
    options['sonar.branch.name'] = baseBranch;
};

const setupOptionsForPRScan = (prID, baseBranch, headBranch) => {
    options['sonar.pullrequest.key'] = prID;
    options['sonar.pullrequest.base'] = baseBranch;
    options['sonar.pullrequest.branch'] = headBranch;
};

const setupOptionsForScan = () => {
    if (process.env.CI) {
        if (process.env.GITHUB_WORKFLOW === 'Playwright Tests') {
            setupOptionsForPRScan(
                process.env.PR_ID,
                process.env.BASE_BRANCH,
                process.env.HEAD_BRANCH
            );
        } else {
            setupOptionsForReleaseScan('main');
        }
    }
};

setupOptionsForScan();

scanner(
    {
        serverUrl: host,
        token,
        options,
    },
    () => process.exit()
);
