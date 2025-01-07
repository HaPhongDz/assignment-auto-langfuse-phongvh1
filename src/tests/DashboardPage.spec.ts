import { DashboardPageAction } from '../actions/DashboardPageAction';
import { test, expect } from '../fixtures/testsetup.fixture';
import { DashboardPage } from '../pageObjects/Dashboard/DashboardPage';
import data  from '../test-data/time-filter-combobox-options.json';
import {stepLogger as logger} from '../utils/Logger';
import {COLOR} from '../../config/config'

test('TC_DTRP_001: Verify that the DateTime Range Picker displays the correct default label and values', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_001 - Verify that the DateTime Range Picker displays the correct default label and values');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    logger.info('Step 1: Navigate to the dashboard page');
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Observe the DateTime Range Picker field
    logger.info('Step 2: Observe the DateTime Range Picker field');
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const expectedLabel = `${dashboardPageAction.formatDateTime(oneDayAgo, 'MMDDYY:HH:MM')} - ${dashboardPageAction.formatDateTime(now, 'MMDDYY:HH:MM')}`;

    // Step 3: Verify the label displays the current date and time in the expected format
    logger.info('Step 3: Verify the label displays the current date and time in the expected format');
    await dashboardPageAction.verifyDefaultDateTimeRangePicker(expectedLabel);

    logger.info('Test completed: TC_DTRP_001 - Verify that the DateTime Range Picker displays the correct default label and values');
});

test('TC_DTRP_002: Verify that clicking on the DateTime Range Picker opens the dialog with correct headers and pickers', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_002 - Verify that clicking on the DateTime Range Picker opens the dialog with correct headers and pickers');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    logger.info('Step 1: Navigate to the dashboard page');
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime Range Picker field
    logger.info('Step 2: Click on the DateTime Range Picker field');
    await dashboardPageAction.openDateTimeRangePickerDialog();

    // Step 3: Verify the dialog headers and pickers
    logger.info('Step 3: Verify the dialog headers and pickers');
    await dashboardPageAction.verifyDateTimeRangePickerDialog();

    logger.info('Test completed: TC_DTRP_002 - Verify that clicking on the DateTime Range Picker opens the dialog with correct headers and pickers');
});

test('TC_DTRP_003: Verify the behavior when "Today" is selected', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_003 - Verify the behavior when "Today" is selected');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);
    const dashBoardPage = new DashboardPage(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime Range Picker field
    await dashboardPageAction.openDateTimeRangePickerDialog();

    // Step 3: Click on "Today" in the left Date calendar
    const today = new Date();
    const todayButton = dashBoardPage.getButtonDateRangeByValue(dashBoardPage.leftDateRangePicker, today.getDate());
    await todayButton.click();

    // Step 4: Observe the highlights and label of the DateTime Range Picker field
    dashboardPageAction.validateBackgroundColor(todayButton, 'rgb(15, 23, 42)');

    const expectedLabel = dashboardPageAction.formatDateTime(today, 'MMDDYYYY', false);
    await dashboardPageAction.verifyTimeRangePicker(expectedLabel); // Verify the label changes to today's date

    // Step 5: Verify both Start Time and End Time reset to `12:00:00AMGMT+7`
    const expectedStartTime = new Date(today.setHours(0, 0, 0));
    const expectedEndTime = new Date(today.setHours(0, 0, 0));
    await dashboardPageAction.validateTimeRangePicker(dashBoardPage, expectedStartTime, expectedEndTime);

    logger.info('Test completed: TC_DTRP_003 - Verify the behavior when "Today" is selected');
});

test('TC_DTRP_004: Verify the behavior when "Yesterday" is selected', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_004 - Verify the behavior when "Yesterday" is selected');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);
    const dashBoardPage = new DashboardPage(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime Range Picker field
    await dashboardPageAction.openDateTimeRangePickerDialog();

    // Step 3: Click on "Yesterday" in the left Date calendar
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayButton = dashBoardPage.getButtonDateRangeByValue(dashBoardPage.leftDateRangePicker, yesterday.getDate())
    await yesterdayButton.click();

    // Step 4: Observe the highlights(Not highlights) and label of the DateTime Range Picker field
    await dashboardPageAction.validateBackgroundColor(yesterdayButton, COLOR.HIGHLIGHTED_COLOR, false);

    const today = new Date();
    const todayButton = dashBoardPage.getButtonDateRangeByValue(dashBoardPage.leftDateRangePicker, today.getDate())
    dashboardPageAction.validateBackgroundColor(todayButton, COLOR.HIGHLIGHTED_COLOR, false);

    const expectedLabel = 'Pick a date';
    await dashboardPageAction.verifyTimeRangePicker(expectedLabel); // Verify the label changes to "Pick a date"

    // Step 5: Verify both Start Time and End Time reset to `12:00:00AMGMT+7`
    const expectedStartTime = new Date(today.setHours(0, 0, 0));
    const expectedEndTime = new Date(today.setHours(0, 0, 0));
    await dashboardPageAction.validateTimeRangePicker(dashBoardPage, expectedStartTime, expectedEndTime);

    logger.info('Test completed: TC_DTRP_004 - Verify the behavior when "Yesterday" is selected');
});

test('TC_DTRP_005: Verify the behavior when selecting a future date with custom times', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_005 - Verify the behavior when selecting a future date with custom times');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);
    const dashBoardPage = new DashboardPage(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime Range Picker field
    await dashboardPageAction.openDateTimeRangePickerDialog();

    // Step 3: Select a future date (e.g., Jan 5, 2025) in the left Date calendar
    const futureDate = new Date();
    const yesterday = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    yesterday.setDate(yesterday.getDate() - 1);
    const futureDateButton = dashBoardPage.getButtonDateRangeByValue(dashBoardPage.rightDateRangePicker, futureDate.getDate());
    const yesterdayButton = dashBoardPage.getButtonDateRangeByValue(dashBoardPage.leftDateRangePicker, yesterday.getDate())
    await futureDateButton.click();

    // Step 4: Set Start Time to `10:23:01AM`
    //await dashboardPageAction.setTimeRangePicker(dashBoardPage.timePickerStartTime, '10', '23', '00', 'AM');

    // Step 5: Set End Time to `06:59:59AM`
    //await dashboardPageAction.setTimeRangePicker(dashBoardPage.timePickerEndTime, '06', '59', '00', 'AM');

    // Step 6: Observe the highlights and label of the DateTime Range Picker field
    dashboardPageAction.validateBackgroundColor(futureDateButton, COLOR.HIGHLIGHTED_COLOR);
    dashboardPageAction.validateBackgroundColor(yesterdayButton, COLOR.HIGHLIGHTED_COLOR);

    //const expectedLabelFuture = 'Dec 27, 24 : 10:23 - Jan 05, 25 : 06:59';
    //await dashboardPageAction.verifyTimeRangePicker(expectedLabelFuture); // Verify the label changes to the expected format

    logger.info('Test completed: TC_DTRP_005 - Verify the behavior when selecting a future date with custom times');
});


test('TC_DTRP_007: Verify the default value of the field on the dashboard', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_007 - Verify the default value of the field on the dashboard');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Observe the field displaying the DateTime range
    const defaultValue = await dashboardPageAction.getTimeFilterComboboxValue();
    expect(defaultValue).toBe('24 hours'); // Verify the default value is '24 hours'

    logger.info('Test completed: TC_DTRP_007 - Verify the default value of the field on the dashboard');
});

test('TC_DTRP_008: Verify the available options in the dropdown when the field is clicked', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_008 - Verify the available options in the dropdown when the field is clicked');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime range picker field
    await dashboardPageAction.openDateTimeRangePickerDropdown();

    // Step 3: Observe the dropdown options
    const expectedOptions = data.timeFilterOptions;
    const actualOptions = await dashboardPageAction.getDateTimeRangePickerDropdownOptions();
    expect(actualOptions).toEqual(expectedOptions); // Verify the dropdown options match the expected options

    logger.info('Test completed: TC_DTRP_008 - Verify the available options in the dropdown when the field is clicked');
});

test('TC_DTRP_009: Verify the displayed DateTime range when "5 min" is selected', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_DTRP_009 - Verify the displayed DateTime range when "5 min" is selected');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the DateTime range picker field
    await dashboardPageAction.openDateTimeRangePickerDropdown();

    // Step 3: Select the option "5 min" from the dropdown
    await dashboardPageAction.selectDateTimeRangePickerOption('5 min');

    // Step 4: Observe the updated value of the DateTime range picker field    
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const expectedLabel = `${dashboardPageAction.formatDateTime(fiveMinutesAgo,'MMDDYY:HH:MM')} - ${dashboardPageAction.formatDateTime(now,'MMDDYY:HH:MM')}`;
    await dashboardPageAction.verifyDefaultDateTimeRangePicker(expectedLabel);

    logger.info('Test completed: TC_DTRP_009 - Verify the displayed DateTime range when "5 min" is selected');
});

test('TC_Filter_001: Verify the display of the filter icon on the dashboard', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_001 - Verify the display of the filter icon on the dashboard');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Observe the filter icon (lucide-filter)
    await dashboardPageAction.VerifyFilterBuilderIcon();

    logger.info('Test completed: TC_Filter_001 - Verify the display of the filter icon on the dashboard');
});

test('TC_Filter_002: Verify the display of the filter dialog when the filter icon is clicked', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_002 - Verify the display of the filter dialog when the filter icon is clicked');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);
    const dashboardPage = new DashboardPage(loggedInPage);

    // Step 1: Navigate to the dashboard page
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Click on the filter icon (lucide-filter)
    await dashboardPageAction.clickFilterIcon();

    // Step 3: Observe the displayed dialog
    //Column 1: Label "where".    
    const whereLabel = await dashboardPage.getElementText(dashboardPage.filterBuilderLineLabel);
    expect(whereLabel).toBe('Where');

    //Column 2: Dropdown with default text "Column".
    const filterTypeDropdown = await dashboardPage.filterBuilderFilterType;
    expect(filterTypeDropdown).toBeVisible();
    expect(await dashboardPage.getElementText(filterTypeDropdown)).toBe('Column');   
  
    //Column 3: Dropdown with selection options based on column selection.
    const operatorDropdown = await dashboardPage.filterBuilderFilterOperator;
    expect(operatorDropdown).toBeVisible();

    //Column 4: Displays " by default.
    const valueDropdown = await dashboardPage.filterBuilderFilterValueDefault;
    expect(valueDropdown).toBeVisible();

    //Column 5: Displays an icon (lucide-x) for deleting the current row.
    const deleteIcon = await dashboardPage.filterBuilderDeleteFilter;    
    expect(deleteIcon).toBeVisible();

    //Button Add filter
    const addFilterButton = await dashboardPage.filterBuilderAddFilter;
    expect(addFilterButton).toBeVisible();
    expect(await dashboardPage.getElementText(addFilterButton)).toBe('Add filter');   
    logger.info('Test completed: TC_Filter_002 - Verify the display of the filter dialog when the filter icon is clicked');
});

test('TC_Filter_003: Verify the options in the dropdown for Column selection', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_003 - Verify the options in the dropdown for Column selection');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page and open the filter dialog
    await dashboardPageAction.navigateToDashboard();
    await dashboardPageAction.clickFilterIcon();

    // Step 2: Click on the "Column" dropdown in Column 2
    await dashboardPageAction.clickColumnDropdown();

    // Step 3: Observe the available options
    const actualOptions = await dashboardPageAction.getColumnDropdownOptions();
    const expectedOptions = data.filterTypeOptions;
    expect(actualOptions).toEqual(expectedOptions); // Verify the dropdown options match the expected options

    logger.info('Test completed: TC_Filter_003 - Verify the options in the dropdown for Column selection');
});

test('TC_Filter_004: Verify the operator dropdown options based on column selection', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_004 - Verify the operator dropdown options based on column selection');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page and open the filter dialog
    await dashboardPageAction.navigateToDashboard();

    // Step 2: Select "Trace Name" in Column 2    
    await dashboardPageAction.clickFilterIcon();
    await dashboardPageAction.clickColumnDropdown();
    await dashboardPageAction.selectFilterBuiderTypeDropdownOption("Trace Name");

    // Step 3: Observe the options in the dropdown for Column 3    
    logger.info('Click to open operator filter dropdown');
    await dashboardPageAction.clickOperatorDropdown();
    let actualOptions = await dashboardPageAction.getOperatorDropdownOptions();
    let expectedOptions = data.filterOperatiorOptionsforTraceName;
    expect(actualOptions).toEqual(expectedOptions); // Verify the dropdown options match the expected options for "Trace Name"
    await dashboardPageAction.selectFilterBuiderOperatorDropdownOption('any of');

    // Step 4: Select "Tags" in Column 2
    await dashboardPageAction.clickColumnDropdown();
    await dashboardPageAction.selectFilterBuiderTypeDropdownOption('Tags');

    // Step 5: Observe the options in the dropdown for Column 3
    logger.info('Click to open operator filter dropdown');
    await dashboardPageAction.clickOperatorDropdown();
    actualOptions = await dashboardPageAction.getOperatorDropdownOptions();
    expectedOptions = data.filterOperatiorOptionsforTags;
    expect(actualOptions).toEqual(expectedOptions); // Verify the dropdown options match the expected options for "Tags"

    logger.info('Test completed: TC_Filter_004 - Verify the operator dropdown options based on column selection');
});

test('TC_Filter_005: Verify that the selected value in Column 4 is displayed correctly', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_005 - Verify that the selected value in Column 4 is displayed correctly');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);
    const dashboardPage = new DashboardPage(loggedInPage);

    // Step 1: Navigate to the dashboard page and open the filter dialog
    await dashboardPageAction.navigateToDashboard();
    await dashboardPageAction.clickFilterIcon();

    // Step 2: Select "Trace Name" in Column 2    
    logger.info('Click to open type filter dropdown');
    dashboardPage.clickElement(dashboardPage.filterBuilderFilterType);
    await dashboardPageAction.selectFilterBuiderTypeDropdownOption('Trace Name');

    // Step 3: Select "any of" in Column 3
    logger.info('Click to open operator filter dropdown');
    dashboardPage.clickElement(dashboardPage.filterBuilderFilterOperator);
    await dashboardPageAction.selectFilterBuiderOperatorDropdownOption('any of');

    // Step 4: Click on Column 4 ("Select")
    logger.info('Click to open value filter dropdown');
    dashboardPage.clickElement(dashboardPage.filterBuilderFilterValue);

    // Step 5: Choose a value (e.g., `qa`)
    await dashboardPageAction.selectFilterBuiderValueDropdownOption('qa');

    // Step 6: Observe the display of the selected value
    const selectedValue = await dashboardPageAction.getBadgeValue();
    expect(selectedValue).toContain('qa'); // Verify Column 4 updates to display the selected value

    logger.info('Test completed: TC_Filter_005 - Verify that the selected value in Column 4 is displayed correctly');
});

test('TC_Filter_007: Verify that clicking "Add filter" adds a new row to the dialog', async ({ loggedInPage }) => {
    logger.info('Starting test: TC_Filter_007 - Verify that clicking "Add filter" adds a new row to the dialog');
    const dashboardPageAction = new DashboardPageAction(loggedInPage);

    // Step 1: Navigate to the dashboard page and open the filter dialog
    await dashboardPageAction.navigateToDashboard();
    await dashboardPageAction.clickFilterIcon();

    // Step 2: Click on the "Add filter" button
    await dashboardPageAction.clickAddFilterButton();

    // Step 3: Observe the dialog for the new row
    const listFilterBuilderLine = await dashboardPageAction.getAllFilterBuilderLine();
    expect(listFilterBuilderLine.length).toBe(2);

    const lastFilterBuildeLine = listFilterBuilderLine[listFilterBuilderLine.length - 1];
    const newRowLabel = await dashboardPageAction.getLabelOnRow(lastFilterBuildeLine);
    expect(newRowLabel).toBe('And'); // Verify the new row label is "And"

    // Step 4: Click Delete on the last row
    await dashboardPageAction.clickDeleteOnRow(lastFilterBuildeLine);

    // Step 5: Observe the dialog for the remaining rows
    const existingFilterBuilderLine = listFilterBuilderLine[0];
    const remainingRowLabel = await dashboardPageAction.getLabelOnRow(existingFilterBuilderLine);
    expect(remainingRowLabel).toBe('Where'); // Verify the remaining row label is "Where"

    logger.info('Test completed: TC_Filter_007 - Verify that clicking "Add filter" adds a new row to the dialog');
});










