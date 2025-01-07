# Playwright Test Framework

## Table of Contents
- [Playwright Test Framework](#playwright-test-framework)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)
  - [Show report](#show-report)
  - [License](#license)
  - [Contact](#contact)

## Description

This project is designed to test the functionality of the Dashboard page, specifically focusing on the time filter combobox and date-time range picker. The tests are written using Playwright and TypeScript.

## Approach
The approach for this project is to use Playwright for end-to-end testing of the Dashboard page. The tests are designed to verify the functionality of the time filter combobox and date-time range picker. The tests are written in TypeScript and follow the Page Object Model (POM) pattern to ensure maintainability and readability.

## Features
Automated end-to-end testing using Playwright
Page Object Model (POM) pattern for maintainability
Logging using winston
HTML reports for test results
Visual regression testing using snapshots

## Tech Stacks
- Playwright
- TypeScript
- Node.js
- Winston (for logging)
- Pixel Match (for image comparison)

## Prerequisites

- Node.js (v22.12.0 LTS or higher)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/HaPhongDz/assignment-auto-langfuse-phongvh.git
    ```

2. Navigate to the project directory:
    ```sh
    cd [project-name]
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```
## Testcase samples
Verify Time Filter Combobox
This test verifies that the time filter combobox is working correctly by: 
1. Opening the time filter combobox.
2. Verifying the options available in the combobox.
3. Selecting a value in the time filter.
4. Verifying the selected option.
       
Verify Date Time Range Filter
This test verifies that the date-time range filter field is working correctly by:
1. Opening the date-time range picker.
2. Selecting a date-time range.
3. Verifying the selected date-time range.

## Running Tests

To run the tests, use the following command:
```sh
    npm run test
```

## Project Structure
    project-root/
    ├── .github/
    │   └── workflows/
    │       ├── playwright.yml
    │       └── schedule.yaml
    ├── .vscode/
    │   └── launch.json
    ├── auth/
    │   └── storageState.json
    ├── config/
    │   └── playwright.config.ts
    ├── logs/
    │   └── test.log
    ├── playwright-report/
    │   └── index.html
    ├── snapshots/ (for image comparison)
    ├── src/
    │   ├── actions/
    │   │   ├── DashboardPageAction.ts
    │   │   └── LoginPageAction.ts
    │   ├── fixtures/
    │   │   └── testsetup.fixture.ts
    │   ├── pageObjects/
    │   │   ├── BasePage.ts
    │   │   ├── Dashboard/
    │   │   │   └── DashboardPage.ts
    │   │   └── LoginPage/
    │   │       └── LoginPage.ts
    │   ├── test-data/
    │   │   └── testdata.json
    │   ├── tests/
    │   │   ├── dashboard.spec.ts
    │   │   └── login.spec.ts
    │   └── utils/
    │       └── Logger.ts
    ├── test-results/
         └── .last-run.json


## Show report
    npx playwright show-report

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or issues, please contact hp1204.97@gmail.com.

--------------------------------------------------------------------------------------------------------------------------
