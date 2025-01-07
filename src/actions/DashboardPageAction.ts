import { Locator, Page, expect } from '@playwright/test';
import { DashboardPage } from '../pageObjects/Dashboard/DashboardPage';
import logger from '../utils/Logger';
import { URLS } from '../../config/config';
import { compareScreenshots } from '../../src/utils/ImageComparison';


export class DashboardPageAction {
    private dashboardPage: DashboardPage;

    constructor(page: Page) {
        this.dashboardPage = new DashboardPage(page);
    }

    // Navigate to Dashboard Page
    async navigateToDashboard() {
        logger.info('Navigating to Dashboard Page');
        await this.dashboardPage.navigateTo(URLS.DASHBOARD_PAGE);
    }

    // Verify default DateTime Range Picker label and values
    async verifyDefaultDateTimeRangePicker(expectedLabel: string) {
        logger.info('Verifying default DateTime Range Picker label and values');
        const actualLabel = await this.getDateTimeRangePickerValue();
        expect(actualLabel?.trim()).toEqual(expectedLabel);
    }

    async getDateTimeRangePickerValue() {
        logger.info('Getting DateTime Range Picker value');
        return await this.dashboardPage.getElementText(this.dashboardPage.dateTimeRangePicker);
    }
    
    // Open DateTime Range Picker dialog
    async openDateTimeRangePickerDialog() {
        logger.info('Opening DateTime Range Picker dialog');
        await this.dashboardPage.dateTimeRangePicker.click();
    }

    // Format date time
    formatDateTime(date: Date, formatType: 'MMDDYYYY:HH:MM' | 'MMDDYYYY' | 'MMYYYY' | 'MMDDYY:HH:MM' = 'MMDDYYYY:HH:MM', fullMonth: boolean = false): string {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = fullMonth ? monthsFull[date.getMonth()] : monthsShort[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        const shortYear = year.toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        switch (formatType) {
            case 'MMDDYYYY:HH:MM':
                return `${month} ${day}, ${year} : ${hours}:${minutes}`;
            case 'MMDDYYYY':
                return `${month} ${day}, ${year}`;
            case 'MMYYYY':
                return `${month} ${year}`;
            case 'MMDDYY:HH:MM':
                return `${month} ${day}, ${shortYear} : ${hours}:${minutes}`;
            default:
                return `${month} ${day}, ${year} : ${hours}:${minutes}`;
        }
    }

    // Convert 24-hour format to 12-hour format
    convertTo12HourFormat(hours: number): string {
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${hour} ${period}`;
    }

    async verifyDateTimeRangePickerDialog() {
        logger.info('Verifying DateTime Range Picker dialog headers and pickers');

        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const expectedHeaderLeft = `${this.formatDateTime(now, 'MMYYYY', true)}`;
        const expectedHeaderRight = `${this.formatDateTime(nextMonth, 'MMYYYY', true)}`;

        //Get the actual header values for left and right
        const actualHeaderLeft = await this.dashboardPage.dateTimeDialogHeaderLeft.textContent();
        const actualHeaderRight = await this.dashboardPage.dateTimeDialogHeaderRight.textContent();

        expect(actualHeaderLeft?.trim()).toEqual(expectedHeaderLeft);
        expect(actualHeaderRight?.trim()).toEqual(expectedHeaderRight);

        
        // Verify background color for "yesterday" and "today"
        const yesterdayElement = this.dashboardPage.getButtonDateRangeByValue(this.dashboardPage.leftDateRangePicker, yesterday.getDate());
        const todayElement = this.dashboardPage.getButtonDateRangeByValue(this.dashboardPage.leftDateRangePicker, now.getDate());

        const yesterdayBackgroundColor = await yesterdayElement.evaluate((el) => getComputedStyle(el).backgroundColor);
        const todayBackgroundColor = await todayElement.evaluate((el) => getComputedStyle(el).backgroundColor);

        expect(yesterdayBackgroundColor).toBe('rgb(15, 23, 42)');
        expect(todayBackgroundColor).toBe('rgb(15, 23, 42)');

        // Verify time pickers: Expected StartTime and EndTime is the current time
        // Verify time pickers
        
        const timePickers = [
            { picker: this.dashboardPage.timePickerStartTime, time: now },
            { picker: this.dashboardPage.timePickerEndTime, time: now }
        ];

        for (const { picker, time } of timePickers) {
            const actualTime = {
                hour: (await this.dashboardPage.getTimeRangePickerHour(picker).getAttribute('value'))?.trim(),
                minute: (await this.dashboardPage.getTimeRangePickerMinute(picker).getAttribute('value'))?.trim(),                
                ampm: (await this.dashboardPage.getTimeRangePickerAMPM(picker).textContent())?.trim()
            };
    
            const expectedHour = this.convertTo12HourFormat(time.getHours());
            const [expectedHourValue, expectedAMPM] = expectedHour.split(' ');
            const expectedMinute = time.getMinutes().toString().padStart(2, '0');
            const expectedSecond = time.getSeconds().toString().padStart(2, '0');
    
            expect(actualTime.hour).toEqual(expectedHourValue.padStart(2, '0'));
            expect(actualTime.minute).toEqual(expectedMinute);            
            expect(actualTime.ampm).toEqual(expectedAMPM);
        }
    }

    async validateTimeRangePicker(dashBoardPage : DashboardPage, expectedStartime: Date, expectedEndTime: Date) {
                
        const timePickers = [
            { picker: dashBoardPage.timePickerStartTime, time: expectedStartime },
            { picker: dashBoardPage.timePickerEndTime, time: expectedEndTime }
        ];

        for (const { picker, time } of timePickers) {
            const actualTime = {
                hour: (await dashBoardPage.getTimeRangePickerHour(picker).getAttribute('value'))?.trim(),
                minute: (await dashBoardPage.getTimeRangePickerMinute(picker).getAttribute('value'))?.trim(),                
                ampm: (await dashBoardPage.getTimeRangePickerAMPM(picker).textContent())?.trim()
            };
    
            const expectedHour = this.convertTo12HourFormat(time.getHours());
            const [expectedHourValue, expectedAMPM] = expectedHour.split(' ');
            const expectedMinute = time.getMinutes().toString().padStart(2, '0');
            const expectedSecond = time.getSeconds().toString().padStart(2, '0');
    
            expect(actualTime.hour).toEqual(expectedHourValue.padStart(2, '0'));
            expect(actualTime.minute).toEqual(expectedMinute);            
            //expect(actualTime.ampm).toEqual(expectedAMPM);
        }
    }

    async setTimeRangePicker(locator:Locator , hour: string, minute: string, second: string, ampm: string) {
        const timePickerHour = this.dashboardPage.getTimeRangePickerHour(locator);
        const timePickerMinute = this.dashboardPage.getTimeRangePickerMinute(locator);
        const timePickerSecond = this.dashboardPage.getTimeRangePickerSecond(locator);
        const timePickerAMPM = this.dashboardPage.getTimeRangePickerAMPM(locator);

        await timePickerHour.fill(hour);
        await timePickerMinute.fill(minute);
        await timePickerSecond.fill(second);
        await timePickerAMPM.fill(ampm);
    }

    // Open combobox
    async openTimeFilterCombobox() {
        logger.info('Opening time filter combobox');
        await this.dashboardPage.clickElement(this.dashboardPage.timeFilterCombobox);
    }

    // Get all options inside combobox
    async getAllOptions(): Promise<string[]> {
        return await this.dashboardPage.getAllTextContents(this.dashboardPage.timeFilterOptions);
    }

    // Verify combobox options
    async verifyTimeFilterComboboxOptions(expectedOptions: string[]) {
        logger.info('Verifying time filter combobox options');
        const actualOptions = await this.getAllOptions();
        logger.info(`Actual Options: ${actualOptions}`);
        expect(actualOptions).toEqual(expectedOptions);
    }

    async selectTimeFilterOption(option: string = "5 min") {
        logger.info(`Selecting time filter option: ${option}`);
        const timeFilterOptions = this.dashboardPage.timeFilterOptions;
        await this.dashboardPage.selectOptionFromDropDown(timeFilterOptions, option);
    }

    async verifyTimeFilterSelectedOption(expectedOption: string = "5 min") {
        logger.info(`Verifying selected time filter option: ${expectedOption}`);
        const selectedOption = await this.dashboardPage.timeFilterCombobox.textContent();
        const dateTimeRangePicker = await this.dashboardPage.dateTimeRangePicker.textContent();
        const expectedDateTimeRangePicker = this.getExpectedDateTimeRangePicker(5);

        expect(selectedOption).toEqual(expectedOption);
        expect(dateTimeRangePicker).toEqual(expectedDateTimeRangePicker);
    }

    private getExpectedDateTimeRangePicker(minutesAgo: number): string {
        const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const now: Date = new Date();
        // const fiveMinutesAgo: Date = new Date(now.getTime() - 5 * 60 * 1000);
        // const twentyFourHoursAgo: Date = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const previousTimeDate: Date = new Date(now.getTime() - minutesAgo * 60 * 1000);
        
        function formatDateTime(date: Date): string {
            const month: string = months[date.getMonth()];
            const day: string = date.getDate().toString().padStart(2, '0');
            const year: string = date.getFullYear().toString().slice(-2);
            const hours: string = date.getHours().toString().padStart(2, '0');
            const minutes: string = date.getMinutes().toString().padStart(2, '0');
            const seconds: string = date.getSeconds().toString().padStart(2, '0');
            
            return `${month} ${day}, ${year} : ${hours}:${minutes}`;
        }
        
        const currentTime: string = formatDateTime(now);
        const previousTime: string = formatDateTime(previousTimeDate);
        
        return `${previousTime} - ${currentTime}`;
    }

    async openTimeRangePicker() {
        logger.info('Opening time range picker');
        await this.dashboardPage.clickElement(this.dashboardPage.dateTimeRangePicker);
    }

    async getTimeFilterComboboxValue() {
        logger.info('Getting time filter value');
        return await this.dashboardPage.getElementText(this.dashboardPage.timeFilterCombobox);
    }

    async openDateTimeRangePickerDropdown() {
        logger.info('Opening time filter dropdown');
        await this.dashboardPage.clickElement(this.dashboardPage.timeFilterCombobox);
    }

    async getDateTimeRangePickerDropdownOptions() {
        logger.info('Getting time filter dropdown options');
        return await this.dashboardPage.getAllTextContents(this.dashboardPage.timeFilterOptions);
    }

    async selectDateTimeRangePickerOption(option : string) {
        logger.info('Select time filter dropdown options');
        const options = await this.dashboardPage.getTimeFilterOptionByText(option);        
        await options.click();
    }


    async verifyTimeRangePicker(expectedDate: string) {
        logger.info('Verifying time range picker');
        const dateTimeRangePicker = await this.dashboardPage.dateTimeRangePicker.textContent();
        expect(dateTimeRangePicker).toEqual(expectedDate);
        //'Dec 01, 24 : 00:00 - Dec 10, 24 : 23:59'
    }

    async VerifyFilterBuilderIcon() {
        logger.info('Verifying filter builder icon');
        const filterBuilderIcon = this.dashboardPage.filterBuilder;
        //Verify filter builder icon is visible
        expect(filterBuilderIcon).toBeVisible();
        
        const actualPath = `snapshots/filter-actual.png`;
        const expectedPath = `snapshots/filter-expected.png`;
        const diffPath = `snapshots/filter-diff.png`

        await filterBuilderIcon.screenshot({ path: actualPath });

        return compareScreenshots(actualPath, expectedPath, diffPath);
    }

    async clickFilterIcon() {
        logger.info('CLick filter builder icon');
        const filterBuilderIcon = this.dashboardPage.filterBuilder;
        await this.dashboardPage.clickElement(filterBuilderIcon);
    }

    async clickColumnDropdown() {
        logger.info('CLick filter builder icon');
        const filterBuilderType = this.dashboardPage.filterBuilderFilterType;
        await this.dashboardPage.clickElement(filterBuilderType);
    }

    async clickOperatorDropdown(){
        logger.info('CLick operator filter builder icon');
        const filterBuilderOperator = this.dashboardPage.filterBuilderFilterOperator;
        await this.dashboardPage.clickElement(filterBuilderOperator);
    }

    async getColumnDropdownOptions() {
        logger.info('Getting coulm filter dropdown options');
        return await this.dashboardPage.getAllTextContents(this.dashboardPage.filterBuilderFilterTypeOptions);
    }

    async getOperatorDropdownOptions() {
        logger.info('Getting value form operator filter dropdown options');
        return await this.dashboardPage.getAllTextContents(this.dashboardPage.filterBuilderFilterOperatorOptions);
    }

    async getBadgeValue() {
        logger.info('Getting value form operator filter dropdown options');
        return await this.dashboardPage.getAllTextContents(this.dashboardPage.filterBuilderFilterBadge);
    }

    async selectFilterBuiderTypeDropdownOption(option: string) {
        logger.info(`Selecting time filter option: ${option}`);        
        const typeOptions = this.dashboardPage.filterBuilderFilterTypeOptions;
        await this.dashboardPage.selectOptionFromDropDown(typeOptions, option);
    }

    async selectFilterBuiderOperatorDropdownOption(option: string) {
        logger.info('Selecting filter buider, operator filter option');  
        const typeOptions = this.dashboardPage.filterBuilderFilterOperatorOptions;
        await this.dashboardPage.selectOptionFromDropDown(typeOptions, option);
    }

    async selectFilterBuiderValueDropdownOption(option: string) {
        logger.info('Selecting filter buider, operator filter option');  
        const valueOptions = this.dashboardPage.filterBuilderFilterValueOptions;
        await this.dashboardPage.selectOptionFromDropDown(valueOptions, option);
    }

    async clickAddFilterButton(){
        logger.info('Clicking add filter button');
        await this.dashboardPage.clickElement(this.dashboardPage.filterBuilderAddFilter);
    }

    async getAllFilterBuilderLine(){
        logger.info('Get all filter builder line');
        return await this.dashboardPage.filterBuilderLine.all();
    }

    async getFilterBuilderLineByLineNumber(lineNumber: number){
        logger.info('Get Row of filter builder by line number');
        return await this.dashboardPage.filterBuilderLine[lineNumber];
    }

    async getLabelOnRow(filterBuilderRow: Locator){
        logger.info('Get label of filter builder by line number');
        const element = filterBuilderRow.locator("//td[1]");
        return await this.dashboardPage.getElementText(element);
    }

    async clickDeleteOnRow(filterBuilderRow: Locator){
        logger.info('Get label of filter builder by line number');
        const deleteBtn = await filterBuilderRow.locator("//td[last()]/button");
        return await this.dashboardPage.clickElement(deleteBtn);
    }

    async validateBackgroundColor(locator:Locator, expectedColor: string, toMatch: boolean = true): Promise<void>{
        let actualColor = await locator.evaluate((el) => getComputedStyle(el).backgroundColor);
        actualColor = actualColor.replace(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*[^)]*\)/, 'rgb($1, $2, $3)'); // Normalize the color value
        if(toMatch)
            expect(actualColor).toBe(expectedColor);
        else
            expect(actualColor).not.toBe(expectedColor);  
    }
}