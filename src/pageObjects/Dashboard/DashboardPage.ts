import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
    // Define Locators
    timeFilterCombobox: Locator;
    timeFilterOptions: Locator;
    dateTimeRangePicker: Locator;
    leftDateRangePicker: Locator;
    rightDateRangePicker: Locator;
    dateRangePickerGoToPreviousMonth: Locator;
    dateRangePickerGoToNextMonth: Locator;
    timePickerStartTime: Locator;
    timePickerEndTime: Locator;
    filterBuilder: Locator;
    filterBuilderAddFilter: Locator;
    filterBuilderFilterType: Locator;
    filterBuilderFilterOperator: Locator;
    filterBuilderFilterValue: Locator;
    filterBuilderLine: Locator;
    filterBuilderDeleteFilter: Locator;
    filterBuilderIcon: Locator;
    dateTimeDialogHeaderLeft: Locator;
    dateTimeDialogHeaderRight: Locator;
    dateTimeDialogDaysLeft: Locator;
    dateTimeDialogDaysRight: Locator;
    dateTimeDialogStartTimePicker: Locator;
    dateTimeDialogEndTimePicker: Locator;
    filterBuilderLineLabel: Locator;
    filterBuilderFilterTypeOptions: Locator;
    filterBuilderFilterOperatorOptions: Locator;
    filterBuilderFilterValueOptions: Locator;
    filterBuilderFilterBadge: Locator;
    filterBuilderFilterValueDefault: Locator;
    
    constructor(page: Page) {
        super(page);

        // Initialize locators
        //Buttons displayed on the Dashboard page 
        this.timeFilterCombobox = this.page.locator('//button[@role="combobox" and @data-sentry-element="SelectTrigger"]');
        this.dateTimeRangePicker = this.page.locator("//button[@data-sentry-source-file='date-picker.tsx']");

        //Buttons displayed on the Date Time Range Picker dialog
        this.leftDateRangePicker = this.page.locator("//div[contains(@class, 'rdp-caption_start')]");
        this.rightDateRangePicker = this.page.locator("//div[contains(@class, 'rdp-caption_end')]");
        this.dateTimeDialogHeaderLeft = this.leftDateRangePicker.locator("//div[@role='presentation']");
        this.dateTimeDialogHeaderRight = this.rightDateRangePicker.locator("//div[@role='presentation']");

        this.dateRangePickerGoToPreviousMonth = this.page.locator("//button[@name='previous-month']");
        this.dateRangePickerGoToNextMonth = this.page.locator("//button[@name='next-month']");        

        this.timePickerStartTime = this.page.locator("//p[text()='Start time']/following-sibling::div[@data-sentry-component='TimePicker']");
        this.timePickerEndTime = this.page.locator("//p[text()='End time']/following-sibling::div[@data-sentry-component='TimePicker']");
        

        this.timeFilterCombobox = this.page.locator('//button[@role="combobox" and @data-sentry-element="SelectTrigger"]');
        this.timeFilterOptions = this.page.locator("//div[@role='option']/span[string-length(text()) > 0]");
        this.filterBuilder = this.page.locator("//button[@data-sentry-source-file='filter-builder.tsx']");
        this.filterBuilderIcon = this.filterBuilder.locator("//svg");
        this.filterBuilderAddFilter = this.page.locator("//button[text()='Add filter']");
        this.filterBuilderLine = this.page.locator("//table[@class='table-auto']//tr");
        this.filterBuilderLineLabel = this.filterBuilderLine.locator("//td[1]");
        this.filterBuilderFilterType = this.filterBuilderLine.locator("//td[2]/button");
        this.filterBuilderFilterOperator = this.filterBuilderLine.locator("//td[3]/button");    
        this.filterBuilderFilterValue = this.filterBuilderLine.locator("//td[4]/button");
        this.filterBuilderFilterValueDefault = this.filterBuilderLine.locator("//td[4]/input");
        this.filterBuilderDeleteFilter = this.filterBuilderLine.locator("//td[last()]/button");
        this.filterBuilderFilterTypeOptions = this.page.locator("//div[@role='option']");
        this.filterBuilderFilterOperatorOptions = this.page.locator("//div[@role='option']//span[text() != '']");
        this.filterBuilderFilterValueOptions = this.page.locator("//div[@role='option']//span[text() != '']");
        this.filterBuilderFilterBadge = this.filterBuilderLine.locator("//div[@data-sentry-component='Badge']");
    }

    getfilterBuilderFilterTypeByLine(lineNumber: number): Locator {
        return this.filterBuilderLine.locator(`//td[contains(@class, 'p-1')][${lineNumber}]/following-sibling::td[last()]/button`);
    }

    getTimeFilterOptionLocator(option : string): Locator {
        return this.timeFilterOptions.getByText(option);
    }
    
    getButtonDateRangeByValue(dateRangeElement: Locator, buttonDateValue: number): Locator {
        //return dateRangeElement.getByText(buttonDateValue.toString());
        return dateRangeElement.locator(`//button[text() = ${buttonDateValue}]`);
    }

    getTimeRangePickerHour(locator: Locator): Locator {
        return locator.locator("//input[@name = '12hours']");
    }

    getTimeRangePickerMinute(locator: Locator): Locator {
        return locator.locator("//input[@name = 'minutes']");
    }

    getTimeRangePickerSecond(locator: Locator): Locator {
        return locator.locator("//input[@name = 'seconds']");
    }

    getTimeRangePickerAMPM(locator: Locator): Locator {
        return locator.locator("//button[@role='combobox']/span");
    }

    getDateTimeRangePickerTimeZone(locator: Locator): Locator {
        return locator.locator("//div[@class='group relative ml-1']//span");
    }

    getFilterBuilderByLine(lineNumber: number): Locator {    
        return this.page.locator(`//td[contains(@class, 'p-1')][${lineNumber}]`);
    }

    getTimeFilterOptionByText(option: string): Locator {
        return this.timeFilterOptions.getByText(option);
    }

    getFilterBuilderFilterTypeByValue(filterOption: string): Locator {
        return this.page.locator(`//div[@role="option" and text()='${filterOption}']`);
    }

    getColumnDropdownOptions(filterOption: string): Locator {
        return this.page.locator(`//div[@role='option']/span[text()='${filterOption}']`);
    }

}