Description

This project is designed to test the functionality of the Dashboard page, specifically focusing on the time filter combobox and date-time range picker. The tests are written using Playwright and TypeScript.


Prerequisites

Node.js (v22.12.0 or higher)

Installation

Clone the repository:https://github.com/your-repo/project-name.git
git clone 

Navigate to the project directory:
cd project-name

Install the dependencies:
npm install


Running Tests

To run the tests, use the following command:


npx playwright test

Project Structure

fixtures/: Contains the test setup and fixtures.
pages/: Contains the page object models for the Dashboard page.
test-data/: Contains the test data in JSON format.
tests/: Contains the test cases.

Logger

The project uses winston for logging. The logger is configured in utils/Logger.ts and is used throughout the project to log important information and actions.


Example Test Cases

Verify Time Filter Combobox

This test verifies that the time filter combobox is working correctly by:


Opening the time filter combobox.
Verifying the options available in the combobox.
Selecting a value in the time filter.
Verifying the selected option.

Verify Date Time Range Filter

This test verifies that the date-time range filter field is working correctly by:


Opening the date-time range picker.
Selecting a date-time range.
Verifying the selected date-time range.

Contributing

Fork the repository.
Create a new branch:
git checkout -b feature-branch

Make your changes and commit them:
git commit -m 'Add some feature'

Push to the branch:
git push origin feature-branch

Create a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.


Contact

For any questions or issues, please contact your-email@example.com.